#!/usr/bin/env pwsh
# Start development server with development environment variables

Write-Host "Starting development server with development environment..." -ForegroundColor Green
Write-Host "Environment file: .env.development" -ForegroundColor Yellow

# Change to project root directory
Set-Location $PSScriptRoot\..

# Run the start command with development environment
npm run start:dev
