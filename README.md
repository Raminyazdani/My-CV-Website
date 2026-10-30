# Recovered CV website code — original frontend preserved

The recovered Django backend models, API, migrations and frontend layout/source are preserved as code. Real SQLite/JSON CV records and static personal assets remain only in the owner's original E: location and were not copied here. The human explicitly confirmed that this is `Raminyazdani/My-CV-Website`. The source Git markers still lack HEAD/config/index and are unchanged. The proposed import uses the verified existing remote `main` parent `6fe82876cbf1584374f803fccc990642d0edb3c6`, not a new repository or an inferred name match.

The original frontend currently refers to missing `~/sections/*` modules and `~/components/Navbar`; its hooks contain unfinished implementations. It remains **UNKNOWN/incomplete** and is not represented as the full working original. It was not replaced by a new generic UI. `demo/index.html` is a separate, dependency-free fictional example, clearly not the original, and makes no network calls. View it directly or serve only `demo/` locally.

Backend requirements are listed in `backend/requirements.txt` (not installed here). Set `CV_WEBSITE_SECRET_KEY`, local `DEBUG/ALLOWED_HOSTS/CORS_ALLOWED_ORIGINS` settings, and an isolated `CV_DATABASE_PATH`; create that database path's parent directory yourself. The code uses environment variables, not a shipped private `.env`. After owner review, normal Django migrations can create a new local database. The existing migration code was preserved; no database operation was run during preparation.

The existing import command now requires `python backend/manage.py populate_cv --input PATH`; without `--write` its handle performs no CV read/import. Django initialization/system checks still apply. Add `--write` only for your reviewed local input and configured database. The expected schema is derived from the preserved importer; no original CV JSON was inspected or supplied. Frontend dependencies/manifests are retained but no complete original frontend build is claimed.

## Publication boundary and history

This is a current-tree, code-only publication copy prepared at the time recorded in `PUBLICATION_PROVENANCE.md`. Original local data and Git repositories are unchanged. Real CVs, contacts, databases, `.env` files, outreach results, browser profiles, personal fixtures and logs were excluded. Synthetic configuration examples contain no real credentials or CV facts.

For owned-repository variants, the proposed branch starts from the recorded existing remote parent. **Old remote Git history may still contain CV/private/runtime data. This change only replaces the new current tree; it does not purge history, rotate credentials, change visibility or make old data safe.** No local source-history commits are imported. Source HEAD and per-file SHA-256 document this code import; no historical commit dates or fake development history are created.

No sender, browser, login, production database or network API was executed during preparation. Validation scope is recorded in the external receipt. Dependencies and full runtime behavior are not claimed verified. Ignore rules do not protect already tracked or historical secrets.

## Confirmed repository and dependency metadata (V3)

The existing public repository identity is human-confirmed; visibility remains unchanged. Its original `LICENSE.md` was retrieved at the pinned remote parent and preserved byte-for-byte (MIT). No new license text, author or historical chronology was invented. The old Swagger boilerplate label was aligned to that existing source license. Local source files, incomplete `.git` markers, real `my_cv.json`/databases and static personal assets remain unchanged outside publication.

Backend dependency metadata was audited with pip-audit 2.10.1: five actual direct requirements resolved20 packages on Python3.12/Windows, zero known vulnerabilities and no skips. Use `backend/constraints-audited-py312-windows.txt` as optional constraints with `-c`, not `-r`; this version snapshot is not a wheel-hash lock or a runtime compatibility guarantee. Other platforms/Python versions, frontend npm packages, browsers/system tools and dynamic schema imports were not audited by that Python check. The recovered DRF `DEFAULT_SCHEMA_CLASS` references legacy coreapi schema behavior and requires compatibility review before a server run. No Django/DB/server/API operation was executed.

Original frontend source/layout remains preserved with17 missing source imports and unfinished hooks, explicitly UNKNOWN/incomplete. The independent fictional `demo/` is not a replacement, reference implementation or reconstruction of the original CV. This branch is for source preservation and review, not a claim of a deployable restored website. Existing remote history may still contain old data; this current-tree import performs no history purge, force-push, credential rotation or visibility change.
