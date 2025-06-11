#!/usr/bin/env pwsh
# Start development server with production environment variables

Write-Host "Starting development server with production environment..." -ForegroundColor Green
Write-Host "Environment file: .env.production" -ForegroundColor Yellow

# Change to project root directory
Set-Location $PSScriptRoot\..

# Run the start command with production environment
npm run start:production
