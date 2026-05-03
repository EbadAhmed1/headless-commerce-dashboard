# Start Backend and Frontend together
# Make sure PostgreSQL is running before executing this script

Write-Host "Starting Backend (dotnet) and Frontend (npm)..." -ForegroundColor Cyan

# Free common ports if already in use (stale previous runs)
foreach ($port in @(5000, 3000)) {
    $listeners = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
    if ($listeners) {
        $pids = $listeners | Select-Object -ExpandProperty OwningProcess -Unique
        foreach ($procId in $pids) {
            try {
                Stop-Process -Id $procId -Force -ErrorAction Stop
                Write-Host "Stopped process $procId on port $port" -ForegroundColor Yellow
            } catch {
                Write-Host "Could not stop process $procId on port $port" -ForegroundColor DarkYellow
            }
        }
    }
}

$backend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend\EcommerceAdminDashboard.Api'; dotnet run" -PassThru
$frontend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm run dev" -PassThru

Write-Host ""
Write-Host "Backend  -> http://localhost:5000"        -ForegroundColor Green
Write-Host "GraphQL  -> http://localhost:5000/graphql" -ForegroundColor Green
Write-Host "Frontend -> http://localhost:3000"         -ForegroundColor Green
Write-Host ""
Write-Host "Press Enter to stop both..." -ForegroundColor Yellow
Read-Host

Stop-Process -Id $backend.Id -Force -ErrorAction SilentlyContinue
Stop-Process -Id $frontend.Id -Force -ErrorAction SilentlyContinue
Write-Host "Stopped." -ForegroundColor Red
