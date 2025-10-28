Write-Host "Railway Deployment Status Checker" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan

Write-Host "Checking service health..." -ForegroundColor Blue
try {
    $response = Invoke-WebRequest -Uri "https://chancifyai.up.railway.app" -TimeoutSec 10 -UseBasicParsing
    Write-Host "Service is responding with status: $($response.StatusCode)" -ForegroundColor Green
}
catch {
    Write-Host "Service is not responding" -ForegroundColor Red
}

Write-Host ""
Write-Host "Quick Fixes Available:" -ForegroundColor Cyan
Write-Host "1. Run: .\scripts\railway_auto_fix.ps1"
Write-Host "2. Manual redeploy: railway redeploy --service frontend"
Write-Host "3. Check logs: railway logs --service frontend"