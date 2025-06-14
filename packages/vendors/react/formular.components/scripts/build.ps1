#!/usr/bin/env pwsh
# Build application with specified environment

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("dev", "integration", "production")]
    [string]$Environment = "dev"
)

Write-Host "Building application for $Environment environment..." -ForegroundColor Green
Write-Host "Environment file: .env.$Environment" -ForegroundColor Yellow

# Change to project root directory
Set-Location $PSScriptRoot\..

switch ($Environment) {
    "dev" { npm run build:dev }
    "integration" { npm run build:integration }
    "production" { npm run build:production }
}

Write-Host "Build completed for $Environment environment!" -ForegroundColor Green
