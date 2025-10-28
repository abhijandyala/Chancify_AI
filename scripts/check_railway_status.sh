#!/bin/bash
# Quick Railway Status Checker
# Run this to check current deployment status

echo "🔍 Railway Deployment Status Checker"
echo "===================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log() {
    echo -e "${BLUE}[$(date '+%H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}✅${NC} $1"
}

error() {
    echo -e "${RED}❌${NC} $1"
}

warning() {
    echo -e "${YELLOW}⚠️${NC} $1"
}

# Check service health
log "Checking service health..."
if curl -s --max-time 10 "https://chancifyai.up.railway.app" > /dev/null 2>&1; then
    success "Service is responding"
else
    error "Service is not responding"
fi

# Check Railway CLI
if command -v railway &> /dev/null; then
    log "Checking deployment logs..."
    
    # Get recent logs
    if railway logs --service frontend --tail 20 > recent_logs.txt 2>&1; then
        echo ""
        echo "📋 Recent Deployment Logs:"
        echo "------------------------"
        cat recent_logs.txt
        
        # Check for errors
        if grep -q "Failed to compile\|Type error:\|Property.*does not exist\|ERROR:" recent_logs.txt; then
            echo ""
            error "Errors detected in deployment logs!"
            echo "Run './scripts/railway_auto_fix.sh' to attempt automatic fixes"
        else
            echo ""
            success "No errors detected in recent logs"
        fi
        
        rm -f recent_logs.txt
    else
        warning "Could not fetch deployment logs"
    fi
else
    warning "Railway CLI not found. Install with: npm install -g @railway/cli"
fi

echo ""
echo "🔧 Quick Fixes Available:"
echo "1. Run: ./scripts/railway_auto_fix.sh"
echo "2. Manual redeploy: railway redeploy --service frontend"
echo "3. Check logs: railway logs --service frontend"
