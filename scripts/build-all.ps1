# Build all packages in the monorepo

Write-Host "Building all packages..."

# Navigate to the root directory
Set-Location -Path "e:\Sources\SignalsPatternsReact"

# Run pnpm build for all packages
pnpm recursive run build

Write-Host "Build process completed for all packages."
