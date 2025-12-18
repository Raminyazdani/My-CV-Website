@echo off
cd %~dp0

echo Removing existing database file...
if exist db.sqlite3 del db.sqlite3

echo Removing migration files...
for /f "delims=" %%i in ('dir /b /s "C:\Users\AFRAA\Desktop\My CV Website\backend\cv\migrations\*.py"') do (
    if not "%%~nxi"=="__init__.py" (
        echo Deleting: %%i
        del "%%i"
    )
)

@REM for /f %%i in ('dir /b /s cv\migrations\*.py') do del %%i


echo Creating new migrations...
python manage.py makemigrations

echo Applying migrations...
python manage.py migrate

echo Creating superuser...
python manage.py create_super_user_custome

echo Loading initial data from fixtures...
python manage.py loaddata .\cv\fixture\all_data.json

echo Reset and initialization complete!

python manage.py runserver
```