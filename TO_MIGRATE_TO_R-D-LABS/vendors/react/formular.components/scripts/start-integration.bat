@echo off
echo Starting development server with integration environment...
echo Environment file: .env.integration

cd /d "%~dp0\.."
npm run start:integration
