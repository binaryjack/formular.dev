#!/usr/bin/env pwsh
# Serve preview with specified environment

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("dev", "integration", "production")]
    [string]$Environment = "dev"
)

Write-Host "Serving preview for $Environment environment..." -ForegroundColor Green
Write-Host "Environment file: .env.$Environment" -ForegroundColor Yellow

# Change to project root directory
Set-Location $PSScriptRoot\..

switch ($Environment) {
    "dev" { npm run serve:dev }
    "integration" { npm run serve:integration }
    "production" { npm run serve:production }
}
