#!/usr/bin/env pwsh
# Start development server with integration environment variables

Write-Host "Starting development server with integration environment..." -ForegroundColor Green
Write-Host "Environment file: .env.integration" -ForegroundColor Yellow

# Change to project root directory
Set-Location $PSScriptRoot\..

# Run the start command with integration environment
npm run start:integration
