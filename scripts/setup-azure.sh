#!/bin/bash

# Azure Setup Script for Dale Rogers Portfolio
# This script helps automate Azure infrastructure setup

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
RESOURCE_GROUP_NAME="dale-rogers-portfolio-rg"
LOCATION="australiaeast"
APP_SERVICE_PLAN_NAME="dale-rogers-portfolio-plan"
WEB_APP_NAME="dale-rogers-portfolio"
SKU="B1"  # Basic tier, change to F1 for free tier

echo -e "${BLUE}🚀 Azure Setup Script for Dale Rogers Portfolio${NC}"
echo "=================================================="

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo -e "${RED}❌ Azure CLI is not installed. Please install it first:${NC}"
    echo "   https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
    exit 1
fi

# Check if user is logged in
echo -e "${YELLOW}🔐 Checking Azure login status...${NC}"
if ! az account show &> /dev/null; then
    echo -e "${YELLOW}⚠️  Not logged in to Azure. Please login:${NC}"
    az login
fi

# Get subscription info
echo -e "${YELLOW}📋 Getting subscription information...${NC}"
SUBSCRIPTION_ID=$(az account show --query id -o tsv)
SUBSCRIPTION_NAME=$(az account show --query name -o tsv)
echo -e "${GREEN}✅ Using subscription: ${SUBSCRIPTION_NAME} (${SUBSCRIPTION_ID})${NC}"

# Create resource group
echo -e "${YELLOW}🏗️  Creating resource group...${NC}"
if az group show --name $RESOURCE_GROUP_NAME &> /dev/null; then
    echo -e "${GREEN}✅ Resource group already exists: ${RESOURCE_GROUP_NAME}${NC}"
else
    az group create --name $RESOURCE_GROUP_NAME --location $LOCATION
    echo -e "${GREEN}✅ Resource group created: ${RESOURCE_GROUP_NAME}${NC}"
fi

# Create App Service Plan
echo -e "${YELLOW}📋 Creating App Service Plan...${NC}"
if az appservice plan show --name $APP_SERVICE_PLAN_NAME --resource-group $RESOURCE_GROUP_NAME &> /dev/null; then
    echo -e "${GREEN}✅ App Service Plan already exists: ${APP_SERVICE_PLAN_NAME}${NC}"
else
    az appservice plan create \
        --name $APP_SERVICE_PLAN_NAME \
        --resource-group $RESOURCE_GROUP_NAME \
        --location $LOCATION \
        --sku $SKU \
        --is-linux
    echo -e "${GREEN}✅ App Service Plan created: ${APP_SERVICE_PLAN_NAME}${NC}"
fi

# Create Web App
echo -e "${YELLOW}🌐 Creating Web App...${NC}"
if az webapp show --name $WEB_APP_NAME --resource-group $RESOURCE_GROUP_NAME &> /dev/null; then
    echo -e "${GREEN}✅ Web App already exists: ${WEB_APP_NAME}${NC}"
else
    az webapp create \
        --name $WEB_APP_NAME \
        --resource-group $RESOURCE_GROUP_NAME \
        --plan $APP_SERVICE_PLAN_NAME \
        --runtime "NODE|20-lts"
    echo -e "${GREEN}✅ Web App created: ${WEB_APP_NAME}${NC}"
fi

# Configure Web App settings
echo -e "${YELLOW}⚙️  Configuring Web App settings...${NC}"
az webapp config set \
    --name $WEB_APP_NAME \
    --resource-group $RESOURCE_GROUP_NAME \
    --linux-fx-version "NODE|20-lts"

# Set application settings
echo -e "${YELLOW}🔧 Setting application configuration...${NC}"
az webapp config appsettings set \
    --name $WEB_APP_NAME \
    --resource-group $RESOURCE_GROUP_NAME \
    --settings \
    NODE_ENV=production \
    SITE_URL="https://${WEB_APP_NAME}.azurewebsites.net" \
    AZURE_WEBAPP_NAME=$WEB_APP_NAME

# Enable Application Insights (optional)
echo -e "${YELLOW}📊 Setting up Application Insights...${NC}"
read -p "Do you want to enable Application Insights? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    az monitor app-insights component create \
        --app "dale-rogers-portfolio-insights" \
        --location $LOCATION \
        --resource-group $RESOURCE_GROUP_NAME \
        --application-type web
    
    INSTRUMENTATION_KEY=$(az monitor app-insights component show \
        --app "dale-rogers-portfolio-insights" \
        --resource-group $RESOURCE_GROUP_NAME \
        --query instrumentationKey -o tsv)
    
    az webapp config appsettings set \
        --name $WEB_APP_NAME \
        --resource-group $RESOURCE_GROUP_NAME \
        --settings \
        APPLICATIONINSIGHTS_CONNECTION_STRING="InstrumentationKey=${INSTRUMENTATION_KEY}"
    
    echo -e "${GREEN}✅ Application Insights enabled${NC}"
fi

# Get publish profile
echo -e "${YELLOW}📥 Getting publish profile...${NC}"
az webapp deployment list-publishing-profiles \
    --name $WEB_APP_NAME \
    --resource-group $RESOURCE_GROUP_NAME \
    --xml > "${WEB_APP_NAME}-publish-profile.xml"

echo -e "${GREEN}✅ Publish profile saved to: ${WEB_APP_NAME}-publish-profile.xml${NC}"

# Display summary
echo -e "${BLUE}🎉 Azure Setup Complete!${NC}"
echo "=================================================="
echo -e "${GREEN}✅ Resource Group: ${RESOURCE_GROUP_NAME}${NC}"
echo -e "${GREEN}✅ App Service Plan: ${APP_SERVICE_PLAN_NAME}${NC}"
echo -e "${GREEN}✅ Web App: ${WEB_APP_NAME}${NC}"
echo -e "${GREEN}✅ URL: https://${WEB_APP_NAME}.azurewebsites.net${NC}"
echo ""
echo -e "${YELLOW}📋 Next Steps:${NC}"
echo "1. Copy the publish profile content to GitHub Secrets"
echo "2. Set up GitHub Actions workflows"
echo "3. Configure custom domain (optional)"
echo "4. Set up monitoring and alerts"
echo ""
echo -e "${YELLOW}🔐 GitHub Secrets needed:${NC}"
echo "AZURE_WEBAPP_NAME=${WEB_APP_NAME}"
echo "AZURE_WEBAPP_PUBLISH_PROFILE=[content from ${WEB_APP_NAME}-publish-profile.xml]"
echo "AZURE_WEBAPP_URL=https://${WEB_APP_NAME}.azurewebsites.net"
echo ""
echo -e "${BLUE}📚 For detailed instructions, see: azure-deployment-guide.md${NC}"
