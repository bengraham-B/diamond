@echo off

REM ===== CONFIG =====
set CONTAINER_NAME=ASUS_DIAMOND_PERSONAL_MariaDB
set DB_NAME=DIAMOND_PERSONAL
set DB_USER=dev
set DB_PASSWORD=diamond

REM ===== DATE FORMAT =====
for /f "tokens=2-4 delims=/ " %%a in ('date /t') do (
    set DD=%%a
    set MM=%%b
    set YYYY=%%c
)

set BACKUP_FILE=backup_%DB_NAME%_%YYYY%-%MM%-%DD%.sql

echo Backing up database...

docker exec %CONTAINER_NAME% mysqldump -u%DB_USER% -p%DB_PASSWORD% %DB_NAME% > %BACKUP_FILE%

echo Backup completed: %BACKUP_FILE%

pause