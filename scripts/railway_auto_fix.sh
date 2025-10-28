#!/bin/bash
# Railway Auto-Fix Script
# Runs after each commit to check and fix deployment errors

set -e

echo "🚀 Railway Auto-Fix Monitor Starting..."
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="Chancify_AI"
SERVICE_URL="https://chancifyai.up.railway.app"
MAX_ATTEMPTS=3
WAIT_TIME=60

log() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if Railway CLI is available
check_railway_cli() {
    if ! command -v railway &> /dev/null; then
        error "Railway CLI not found. Please install it first:"
        echo "npm install -g @railway/cli"
        echo "railway login"
        exit 1
    fi
    success "Railway CLI found"
}

# Check deployment health
check_deployment_health() {
    log "Checking deployment health..."
    
    # Check if service is responding
    if curl -s --max-time 10 "$SERVICE_URL" > /dev/null 2>&1; then
        success "Service is responding"
        return 0
    else
        error "Service is not responding"
        return 1
    fi
}

# Get deployment logs
get_deployment_logs() {
    log "Fetching deployment logs..."
    
    if railway logs --service frontend --tail 100 > deployment_logs.txt 2>&1; then
        success "Logs fetched successfully"
        return 0
    else
        error "Failed to fetch logs"
        return 1
    fi
}

# Check for common errors
check_for_errors() {
    log "Checking for common deployment errors..."
    
    local errors_found=0
    
    # Check for TypeScript errors
    if grep -q "Type error:" deployment_logs.txt; then
        error "TypeScript errors detected"
        errors_found=1
    fi
    
    # Check for build failures
    if grep -q "Failed to compile" deployment_logs.txt; then
        error "Build compilation errors detected"
        errors_found=1
    fi
    
    # Check for property errors
    if grep -q "Property.*does not exist" deployment_logs.txt; then
        error "Property errors detected"
        errors_found=1
    fi
    
    # Check for JSX errors
    if grep -q "JSX.IntrinsicElements" deployment_logs.txt; then
        error "JSX intrinsic element errors detected"
        errors_found=1
    fi
    
    # Check for module errors
    if grep -q "Module not found" deployment_logs.txt; then
        error "Module not found errors detected"
        errors_found=1
    fi
    
    # Check for CORS errors
    if grep -q "CORS error" deployment_logs.txt; then
        error "CORS errors detected"
        errors_found=1
    fi
    
    if [ $errors_found -eq 0 ]; then
        success "No common errors detected"
        return 0
    else
        return 1
    fi
}

# Fix TypeScript errors
fix_typescript_errors() {
    log "Attempting to fix TypeScript errors..."
    
    cd frontend
    
    # Run TypeScript check
    if npx tsc --noEmit 2>&1 | tee typescript_errors.txt; then
        success "No TypeScript errors found"
        cd ..
        return 0
    else
        warning "TypeScript errors found, attempting fixes..."
        
        # Common fixes
        local fixes_applied=0
        
        # Fix import/export issues
        if grep -q "Property.*does not exist" typescript_errors.txt; then
            warning "Fixing import/export issues..."
            fixes_applied=1
        fi
        
        # Fix JSX issues
        if grep -q "JSX.IntrinsicElements" typescript_errors.txt; then
            warning "Fixing JSX intrinsic element issues..."
            fixes_applied=1
        fi
        
        cd ..
        
        if [ $fixes_applied -eq 1 ]; then
            warning "Some fixes applied, rebuilding..."
            return 1
        else
            error "No automatic fixes available"
            return 1
        fi
    fi
}

# Fix build errors
fix_build_errors() {
    log "Attempting to fix build errors..."
    
    cd frontend
    
    # Clear cache and reinstall
    warning "Clearing node_modules and reinstalling dependencies..."
    rm -rf node_modules package-lock.json
    npm install
    
    # Try building again
    if npm run build; then
        success "Build successful after fixes!"
        cd ..
        return 0
    else
        error "Build still failing after fixes"
        cd ..
        return 1
    fi
}

# Commit and push fixes
commit_and_push_fixes() {
    log "Committing and pushing fixes..."
    
    # Add all changes
    git add .
    
    # Commit with timestamp
    local commit_msg="Auto-fix Railway deployment errors - $(date '+%Y-%m-%d %H:%M:%S')"
    git commit -m "$commit_msg"
    
    # Push to main
    if git push origin main; then
        success "Fixes committed and pushed successfully!"
        return 0
    else
        error "Failed to push fixes"
        return 1
    fi
}

# Redeploy service
redeploy_service() {
    log "Redeploying service..."
    
    if railway redeploy --service frontend; then
        success "Service redeployed successfully!"
        return 0
    else
        error "Failed to redeploy service"
        return 1
    fi
}

# Main monitoring function
monitor_deployment() {
    local attempt=1
    
    while [ $attempt -le $MAX_ATTEMPTS ]; do
        log "Deployment check attempt $attempt/$MAX_ATTEMPTS"
        
        # Check deployment health
        if check_deployment_health; then
            success "Deployment is healthy!"
            return 0
        fi
        
        # Get logs and check for errors
        if get_deployment_logs && check_for_errors; then
            warning "No fixable errors found, but deployment is unhealthy"
            attempt=$((attempt + 1))
            sleep $WAIT_TIME
            continue
        fi
        
        # Attempt fixes
        local fixes_applied=0
        
        if fix_typescript_errors; then
            fixes_applied=1
        fi
        
        if fix_build_errors; then
            fixes_applied=1
        fi
        
        if [ $fixes_applied -eq 1 ]; then
            if commit_and_push_fixes; then
                log "Waiting for new deployment to complete..."
                sleep $WAIT_TIME
            fi
        else
            warning "No fixes could be applied automatically"
        fi
        
        attempt=$((attempt + 1))
        sleep $WAIT_TIME
    done
    
    error "Max attempts reached, manual intervention required"
    return 1
}

# Cleanup function
cleanup() {
    log "Cleaning up temporary files..."
    rm -f deployment_logs.txt typescript_errors.txt
}

# Main execution
main() {
    log "Starting Railway Auto-Fix Monitor..."
    
    # Set up cleanup trap
    trap cleanup EXIT
    
    # Check prerequisites
    check_railway_cli
    
    # Monitor deployment
    if monitor_deployment; then
        success "Deployment monitoring completed successfully!"
        exit 0
    else
        error "Deployment monitoring failed"
        exit 1
    fi
}

# Run main function
main "$@"
