$paths = @(
    "node_modules",
    "dist"
)

foreach ($p in $paths) {
    if (Test-Path $p) {
        Write-Host "Removing $p..."
        Remove-Item -Recurse -Force $p
    }
}

Write-Host "Running npm install..."
npm install

Write-Host "Clean and install complete."
