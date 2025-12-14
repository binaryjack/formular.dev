@echo off
echo Starting development server with production environment...
echo Environment file: .env.production

cd /d "%~dp0\.."
npm run start:production
