#!/bin/bash

# Azure Staging Environment Setup Script
# This script creates the necessary Azure resources for staging deployment

set -e

echo "🚀 Setting up Azure Staging Environment for Dale Rogers Portfolio"
echo "================================================================"

# Configuration
RESOURCE_GROUP="dale-rogers-portfolio-rg"
STAGING_WEBAPP="dale-rogers-portfolio-staging"
PRODUCTION_WEBAPP="dale-rogers-portfolio"
LOCATION="australiaeast"
PLAN_NAME="dale-rogers-portfolio-plan"
RUNTIME="NODE|20-lts"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Azure CLI is installed
check_azure_cli() {
    if ! command -v az &> /dev/null; then
        print_error "Azure CLI is not installed. Please install it first:"
        echo "https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
        exit 1
    fi
    print_success "Azure CLI is installed"
}

# Check if user is logged in to Azure
check_azure_login() {
    if ! az account show &> /dev/null; then
        print_error "You are not logged in to Azure. Please run:"
        echo "az login"
        exit 1
    fi
    
    ACCOUNT_INFO=$(az account show --query "{name:name, id:id, tenantId:tenantId}" -o tsv)
    print_success "Logged in to Azure account: $ACCOUNT_INFO"
}

# Create resource group if it doesn't exist
create_resource_group() {
    print_status "Checking resource group: $RESOURCE_GROUP"
    
    if az group show --name $RESOURCE_GROUP &> /dev/null; then
        print_success "Resource group '$RESOURCE_GROUP' already exists"
    else
        print_status "Creating resource group: $RESOURCE_GROUP in $LOCATION"
        az group create --name $RESOURCE_GROUP --location $LOCATION
        print_success "Resource group '$RESOURCE_GROUP' created successfully"
    fi
}

# Create App Service Plan if it doesn't exist
create_app_service_plan() {
    print_status "Checking App Service Plan: $PLAN_NAME"
    
    if az appservice plan show --resource-group $RESOURCE_GROUP --name $PLAN_NAME &> /dev/null; then
        print_success "App Service Plan '$PLAN_NAME' already exists"
    else
        print_status "Creating App Service Plan: $PLAN_NAME"
        az appservice plan create \
            --resource-group $RESOURCE_GROUP \
            --name $PLAN_NAME \
            --location $LOCATION \
            --sku B1 \
            --is-linux
        print_success "App Service Plan '$PLAN_NAME' created successfully"
    fi
}

# Create staging web app if it doesn't exist
create_staging_webapp() {
    print_status "Checking staging web app: $STAGING_WEBAPP"
    
    if az webapp show --resource-group $RESOURCE_GROUP --name $STAGING_WEBAPP &> /dev/null; then
        print_success "Staging web app '$STAGING_WEBAPP' already exists"
    else
        print_status "Creating staging web app: $STAGING_WEBAPP"
        az webapp create \
            --resource-group $RESOURCE_GROUP \
            --plan $PLAN_NAME \
            --name $STAGING_WEBAPP \
            --runtime $RUNTIME \
            --deployment-local-git
        
        # Configure staging-specific settings
        print_status "Configuring staging web app settings"
        az webapp config set \
            --resource-group $RESOURCE_GROUP \
            --name $STAGING_WEBAPP \
            --linux-fx-version "NODE|20-lts" \
            --min-tls-version "1.2" \
            --http20-enabled true
        
        # Set environment variables
        az webapp config appsettings set \
            --resource-group $RESOURCE_GROUP \
            --name $STAGING_WEBAPP \
            --settings \
            NODE_ENV=staging \
            WEBSITE_NODE_DEFAULT_VERSION=20-lts \
            WEBSITE_RUN_FROM_PACKAGE=1
        
        print_success "Staging web app '$STAGING_WEBAPP' created and configured successfully"
    fi
}

# Check production web app exists
check_production_webapp() {
    print_status "Checking production web app: $PRODUCTION_WEBAPP"
    
    if az webapp show --resource-group $RESOURCE_GROUP --name $PRODUCTION_WEBAPP &> /dev/null; then
        print_success "Production web app '$PRODUCTION_WEBAPP' exists"
    else
        print_warning "Production web app '$PRODUCTION_WEBAPP' does not exist"
        print_status "You may need to create it manually or it may have a different name"
    fi
}

# Get web app URLs
get_webapp_urls() {
    print_status "Getting web app URLs..."
    
    STAGING_URL=$(az webapp show --resource-group $RESOURCE_GROUP --name $STAGING_WEBAPP --query "defaultHostName" -o tsv 2>/dev/null || echo "N/A")
    PRODUCTION_URL=$(az webapp show --resource-group $RESOURCE_GROUP --name $PRODUCTION_WEBAPP --query "defaultHostName" -o tsv 2>/dev/null || echo "N/A")
    
    echo ""
    echo "🌐 Web App URLs:"
    echo "  Staging:    https://$STAGING_URL"
    echo "  Production: https://$PRODUCTION_URL"
    echo ""
}

# Display next steps
show_next_steps() {
    echo "🎯 Next Steps:"
    echo "==============="
    echo ""
    echo "1. Add these secrets to your GitHub repository:"
    echo "   - AZURE_CREDENTIALS: Your Azure service principal credentials"
    echo "   - AZURE_WEBAPP_URL: https://$PRODUCTION_URL"
    echo "   - AZURE_STAGING_WEBAPP_URL: https://$STAGING_URL"
    echo ""
    echo "2. Test the staging deployment by pushing to the staging branch:"
    echo "   git push origin staging"
    echo ""
    echo "3. Monitor the deployment in GitHub Actions"
    echo ""
    echo "4. Test the staging environment:"
    echo "   curl -f https://$STAGING_URL/api/health"
    echo ""
}

# Main execution
main() {
    echo "Starting Azure staging environment setup..."
    echo ""
    
    check_azure_cli
    check_azure_login
    echo ""
    
    create_resource_group
    create_app_service_plan
    create_staging_webapp
    check_production_webapp
    echo ""
    
    get_webapp_urls
    show_next_steps
    
    print_success "Azure staging environment setup completed!"
    echo ""
    echo "If you encounter any issues, check the troubleshooting guide in docs/DEPLOYMENT.md"
}

# Run the script
main "$@"
