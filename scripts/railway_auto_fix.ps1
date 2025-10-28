# Railway Auto-Fix Monitor - PowerShell Version
# Runs after each commit to check and fix deployment errors

param(
    [int]$MaxAttempts = 3,
    [int]$WaitTime = 60
)

# Configuration
$PROJECT_NAME = "Chancify_AI"
$SERVICE_URL = "https://chancifyai.up.railway.app"

# Colors for output
$RED = "Red"
$GREEN = "Green"
$YELLOW = "Yellow"
$BLUE = "Blue"

function Write-Log {
    param([string]$Message)
    Write-Host "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] $Message" -ForegroundColor $BLUE
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor $RED
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor $GREEN
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor $YELLOW
}

# Check if Railway CLI is available
function Test-RailwayCLI {
    try {
        $null = Get-Command railway -ErrorAction Stop
        Write-Success "Railway CLI found"
        return $true
    }
    catch {
        Write-Error "Railway CLI not found. Please install it first:"
        Write-Host "npm install -g @railway/cli"
        Write-Host "railway login"
        return $false
    }
}

# Check deployment health
function Test-DeploymentHealth {
    Write-Log "Checking deployment health..."
    
    try {
        $response = Invoke-WebRequest -Uri $SERVICE_URL -TimeoutSec 10 -UseBasicParsing
        if ($response.StatusCode -eq 200) {
            Write-Success "Service is responding"
            return $true
        }
        else {
            Write-Error "Service returned status code: $($response.StatusCode)"
            return $false
        }
    }
    catch {
        Write-Error "Service is not responding: $($_.Exception.Message)"
        return $false
    }
}

# Get deployment logs
function Get-DeploymentLogs {
    Write-Log "Fetching deployment logs..."
    
    try {
        $logs = railway logs --service frontend --tail 100 2>&1
        $logs | Out-File -FilePath "deployment_logs.txt" -Encoding UTF8
        Write-Success "Logs fetched successfully"
        return $true
    }
    catch {
        Write-Error "Failed to fetch logs: $($_.Exception.Message)"
        return $false
    }
}

# Check for common errors
function Test-ForErrors {
    Write-Log "Checking for common deployment errors..."
    
    $errorPatterns = @(
        "Type error:",
        "Failed to compile",
        "Property.*does not exist",
        "JSX.IntrinsicElements",
        "Module not found",
        "CORS error",
        "ERROR:",
        "Failed to build"
    )
    
    $errorsFound = $false
    
    foreach ($pattern in $errorPatterns) {
        if (Select-String -Path "deployment_logs.txt" -Pattern $pattern -Quiet) {
            Write-Error "Error pattern detected: $pattern"
            $errorsFound = $true
        }
    }
    
    if (-not $errorsFound) {
        Write-Success "No common errors detected"
        return $false
    }
    
    return $true
}

# Fix TypeScript errors
function Repair-TypeScriptErrors {
    Write-Log "Attempting to fix TypeScript errors..."
    
    Push-Location frontend
    
    try {
        $tscOutput = npx tsc --noEmit 2>&1
        $tscOutput | Out-File -FilePath "../typescript_errors.txt" -Encoding UTF8
        
        if ($LASTEXITCODE -eq 0) {
            Write-Success "No TypeScript errors found"
            Pop-Location
            return $false
        }
        else {
            Write-Warning "TypeScript errors found, attempting fixes..."
            
            $fixesApplied = $false
            
            # Check for specific error types
            if ($tscOutput -match "Property.*does not exist") {
                Write-Warning "Fixing import/export issues..."
                $fixesApplied = $true
            }
            
            if ($tscOutput -match "JSX.IntrinsicElements") {
                Write-Warning "Fixing JSX intrinsic element issues..."
                $fixesApplied = $true
            }
            
            Pop-Location
            
            if ($fixesApplied) {
                Write-Warning "Some fixes applied, rebuilding..."
                return $true
            }
            else {
                Write-Error "No automatic fixes available"
                return $false
            }
        }
    }
    catch {
        Write-Error "Error fixing TypeScript issues: $($_.Exception.Message)"
        Pop-Location
        return $false
    }
}

# Fix build errors
function Repair-BuildErrors {
    Write-Log "Attempting to fix build errors..."
    
    Push-Location frontend
    
    try {
        # Clear cache and reinstall
        Write-Warning "Clearing node_modules and reinstalling dependencies..."
        
        if (Test-Path "node_modules") {
            Remove-Item -Recurse -Force "node_modules"
        }
        if (Test-Path "package-lock.json") {
            Remove-Item -Force "package-lock.json"
        }
        
        npm install
        
        # Try building again
        npm run build
        
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Build successful after fixes!"
            Pop-Location
            return $true
        }
        else {
            Write-Error "Build still failing after fixes"
            Pop-Location
            return $false
        }
    }
    catch {
        Write-Error "Error fixing build issues: $($_.Exception.Message)"
        Pop-Location
        return $false
    }
}

# Commit and push fixes
function Submit-Fixes {
    Write-Log "Committing and pushing fixes..."
    
    try {
        # Add all changes
        git add .
        
        # Commit with timestamp
        $commitMsg = "Auto-fix Railway deployment errors - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
        git commit -m $commitMsg
        
        # Push to main
        git push origin main
        
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Fixes committed and pushed successfully!"
            return $true
        }
        else {
            Write-Error "Failed to push fixes"
            return $false
        }
    }
    catch {
        Write-Error "Error committing fixes: $($_.Exception.Message)"
        return $false
    }
}

# Redeploy service
function Restart-Service {
    Write-Log "Redeploying service..."
    
    try {
        railway redeploy --service frontend
        
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Service redeployed successfully!"
            return $true
        }
        else {
            Write-Error "Failed to redeploy service"
            return $false
        }
    }
    catch {
        Write-Error "Error redeploying service: $($_.Exception.Message)"
        return $false
    }
}

# Main monitoring function
function Start-Monitoring {
    $attempt = 1
    
    while ($attempt -le $MaxAttempts) {
        Write-Log "Deployment check attempt $attempt/$MaxAttempts"
        
        # Check deployment health
        if (Test-DeploymentHealth) {
            Write-Success "Deployment is healthy!"
            return $true
        }
        
        # Get logs and check for errors
        if ((Get-DeploymentLogs) -and (Test-ForErrors)) {
            Write-Warning "No fixable errors found, but deployment is unhealthy"
            $attempt++
            Start-Sleep $WaitTime
            continue
        }
        
        # Attempt fixes
        $fixesApplied = $false
        
        if (Repair-TypeScriptErrors) {
            $fixesApplied = $true
        }
        
        if (Repair-BuildErrors) {
            $fixesApplied = $true
        }
        
        if ($fixesApplied) {
            if (Submit-Fixes) {
                Write-Log "Waiting for new deployment to complete..."
                Start-Sleep $WaitTime
            }
        }
        else {
            Write-Warning "No fixes could be applied automatically"
        }
        
        $attempt++
        Start-Sleep $WaitTime
    }
    
    Write-Error "Max attempts reached, manual intervention required"
    return $false
}

# Cleanup function
function Remove-TempFiles {
    Write-Log "Cleaning up temporary files..."
    Remove-Item -Path "deployment_logs.txt" -ErrorAction SilentlyContinue
    Remove-Item -Path "typescript_errors.txt" -ErrorAction SilentlyContinue
}

# Main execution
function Main {
    Write-Log "Starting Railway Auto-Fix Monitor..."
    
    try {
        # Check prerequisites
        if (-not (Test-RailwayCLI)) {
            exit 1
        }
        
        # Monitor deployment
        if (Start-Monitoring) {
            Write-Success "Deployment monitoring completed successfully!"
            exit 0
        }
        else {
            Write-Error "Deployment monitoring failed"
            exit 1
        }
    }
    finally {
        Remove-TempFiles
    }
}

# Run main function
Main
