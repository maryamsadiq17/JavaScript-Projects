# Script to start Shopify theme dev server with automatic port cleanup
# Usage: .\start-dev.ps1

param(
    [int]$Port = 9293
)

Write-Host "[*] Checking if port $Port is in use..." -ForegroundColor Cyan

# Check if port is listening
$portCheck = netstat -aon | findstr ":$Port"

if ($portCheck) {
    # Extract PID from netstat output
    $pidMatch = $portCheck -match '(\d+)$'
    if ($pidMatch) {
        $pid = $matches[1]
        Write-Host "[!] Port $Port is already in use by PID $pid" -ForegroundColor Yellow
        
        # Get process info
        $processInfo = tasklist /FI "PID eq $pid" /FO LIST 2>$null
        Write-Host "Process info: $processInfo" -ForegroundColor Gray
        
        # Kill the process
        Write-Host "[!] Killing process $pid..." -ForegroundColor Yellow
        taskkill /PID $pid /F | Out-Null
        Start-Sleep -Seconds 1
        Write-Host "[+] Process terminated" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "[*] Starting Shopify theme dev server on port $Port..." -ForegroundColor Cyan
Write-Host "[+] Preview: http://localhost:$Port" -ForegroundColor Green
Write-Host ""

# Start the dev server
shopify theme dev --port $Port
