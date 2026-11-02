"""Standalone synthetic backend smoke check; no original data or live network server."""
import os,sys,pathlib,json,ast,traceback,contextlib,io,socket
import tempfile

def main():
    S=pathlib.Path(__file__).resolve().parents[1];A=pathlib.Path(tempfile.mkdtemp(prefix="cv-website-synthetic-"))
    os.environ.update(DJANGO_SETTINGS_MODULE="core.settings",CV_WEBSITE_SECRET_KEY="SYNTHETIC-LOCAL-TEST-ONLY-NOT-A-REAL-SECRET",CV_DATABASE_PATH=":memory:",DEBUG="True",ALLOWED_HOSTS="testserver,127.0.0.1,localhost",PYTHONDONTWRITEBYTECODE="1")
    sys.dont_write_bytecode=True;sys.path.insert(0,str(S))
    import logging
    logging.disable(logging.CRITICAL)
    results=[]
    def record(name,passed,**kw):results.append(dict(name=name,passed=bool(passed),**kw))
    try:
     # Reject custom executable migration operations before running isolated in-memory migrations.
     for p in (S/"cv/migrations").glob("*.py"):
      tree=ast.parse(p.read_text("utf-8"))
      assert not any(isinstance(n,ast.Attribute)and n.attr in {"RunPython","RunSQL"} for n in ast.walk(tree)),"CUSTOM_MIGRATION_HOLD"
     import django
     django.setup()
     from django.conf import settings
     settings.DATABASES={"default":{"ENGINE":"django.db.backends.sqlite3","NAME":":memory:"}}
     settings.BASE_DIR=A/"fake_project";(settings.BASE_DIR/"cv/static").mkdir(parents=True)
     from django.core.management import call_command
     from django.test import Client
     captured=io.StringIO()
     with contextlib.redirect_stdout(captured),contextlib.redirect_stderr(captured):
      call_command("check",verbosity=0)
     record("django_system_check",True)
     with contextlib.redirect_stdout(captured),contextlib.redirect_stderr(captured):
      call_command("migrate",interactive=False,verbosity=0)
     record("in_memory_migrations",True)
     c=Client()
     endpoints=["basics","profiles","education","languages","certification-issuers","certifications","softskills","projects","interests","publications","experience","references","skill-categories","skill-subcategories","skills","skills-all"]
     for name in endpoints:
      r=c.get("/api/"+name+"/")
      record("empty_api_"+name,r.status_code==200,status=r.status_code)
     # Missing private record returns safe404, without consulting any original path.
     r=c.get("/api/json-value/?key=basics")
     record("missing_record_404",r.status_code==404,status=r.status_code)
     fixture={"basics":{"name":"Synthetic Person","label":"Test fixture"},"education":[],"languages":[],"certificates":[],"work":[],"skills":[],"softSkills":[],"interests":[],"publications":[],"references":[],"projects":[]}
     (settings.BASE_DIR/"cv/static/my_cv.json").open("x",encoding="utf-8").write(json.dumps(fixture))
     for key in fixture:
      r=c.get("/api/json-value/",{"key":key})
      record("synthetic_json_"+key,r.status_code==200 and r.json()=={key:fixture[key]},status=r.status_code)
     r=c.get("/swagger.json/")
     schema=r.json();paths=schema.get("paths",{})
     record("swagger_schema_has_real_endpoints",r.status_code==200 and len(paths)>=16 and "/basics/" in paths,status=r.status_code,path_count=len(paths))
    except Exception as e:
     record("exception",False,type=type(e).__name__,message=str(e)[:400],frames=[dict(file=pathlib.Path(x.filename).name,line=x.lineno,function=x.name)for x in traceback.extract_tb(e.__traceback__)][-8:])
    out=dict(results=results,passed=sum(x["passed"]for x in results),failed=sum(not x["passed"]for x in results),database="in-memory only",data="synthetic fixture outside source tree",network_server_started=False,original_data_reads=0,source_writes=0)
    (A/"RESULT.json").open("x",encoding="utf-8").write(json.dumps(out,indent=2));print(json.dumps(out));sys.exit(1 if out["failed"] else 0)

if __name__ == "__main__":
    main()
