@echo off
setlocal

REM ═══════════════════════════════════════════════════════════════
REM steaksoap — one-command project bootstrap (Windows)
REM Usage: steaksoap new project-name
REM ═══════════════════════════════════════════════════════════════

set "REPO=https://github.com/Mircooo/steaksoap.git"

if "%~1" neq "new" goto :usage
if "%~2"=="" goto :usage

set "NAME=%~2"

if exist "%NAME%" (
  echo   Error: directory '%NAME%' already exists.
  exit /b 1
)

echo.
echo   Creating project '%NAME%'...
echo.

git clone %REPO% %NAME%
cd %NAME%
call pnpm install
call pnpm setup

echo.
echo   Next steps:
echo     cd %NAME%
echo     Open Claude Code
echo     /brief    - design direction
echo     /init     - colors, fonts, styling
echo     pnpm dev  - start building
echo.
goto :eof

:usage
echo.
echo   Usage: steaksoap new ^<project-name^>
echo.
echo   Example: steaksoap new mon-projet
echo.
exit /b 1
