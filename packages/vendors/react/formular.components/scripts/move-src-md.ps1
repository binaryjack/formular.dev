# PowerShell script to move and rename all .md files in src/ (deep search) to docs/
# The new name will be the relative path from src/ with slashes replaced by dots

$root = "e:\Sources\SignalsPatternsReact"
$src = "$root\src"
$docs = "$root\docs"

# Ensure docs directory exists
if (-not (Test-Path $docs)) {
    New-Item -ItemType Directory -Path $docs | Out-Null
}

# Get all .md files under src
Get-ChildItem -Path $src -Recurse -Filter *.md | ForEach-Object {
    $relative = $_.FullName.Substring($src.Length + 1) # relative path from src
    $newName = $relative -replace '\\','.' # replace backslashes with dots
    $newName = $newName -replace '/','.'    # just in case
    Move-Item $_.FullName -Destination (Join-Path $docs $newName)
}
Write-Host "All .md files from src/ have been moved and renamed in docs/."
