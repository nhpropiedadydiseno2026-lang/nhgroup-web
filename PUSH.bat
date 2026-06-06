@echo off
cd /d "C:\Users\yacil\Claude\Projects\pagina web HGgroup\nhgroup-web"
git push origin main
echo.
echo Listo! Vercel desplegara automaticamente.
pause
del "%~f0"
