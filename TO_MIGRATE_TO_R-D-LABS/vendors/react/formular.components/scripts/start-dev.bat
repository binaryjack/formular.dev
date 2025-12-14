@echo off
echo Starting development server with development environment...
echo Environment file: .env.development

cd /d "%~dp0\.."
npm run start:dev
