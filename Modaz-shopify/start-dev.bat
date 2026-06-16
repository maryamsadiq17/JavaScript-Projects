@echo off
REM Start Shopify theme dev server with automatic port cleanup
REM Just double-click this file to run

cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "start-dev.ps1"
pause
