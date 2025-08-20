# Azure Deployment Guide - Step by Step

## Overview

This guide walks you through setting up Azure infrastructure and deploying your Dale Rogers Portfolio to Azure App Service using GitHub Actions.

## Prerequisites

- Azure subscription (free tier works for testing)
- GitHub repository with your portfolio code
- Azure CLI installed locally (optional but recommended)
- Domain name (optional, for custom domain setup)

---

## Step 1: Azure Portal Setup

### 1.1 Create Azure Account

1. Go to [portal.azure.com](https://portal.azure.com)
2. Sign in with Microsoft account or create new one
3. Complete identity verification if prompted
4. Navigate to "Subscriptions" to verify your subscription

### 1.2 Create Resource Group

1. In Azure Portal, click "Create a resource"
2. Search for "Resource Group" and select it
3. Click "Create"
4. Fill in details:
   - **Resource Group Name**: `dale-rogers-portfolio-rg`
   - **Region**: `Australia East` (Sydney) or your preferred region
   - **Review + Create** → **Create**

### 1.3 Create App Service Plan

1. In your resource group, click "Create a resource"
2. Search for "App Service Plan" and select it
3. Click "Create"
4. Fill in details:
   - **Basics Tab**:
     - **App Service Plan Name**: `dale-rogers-portfolio-plan`
     - **Operating System**: `Linux`
     - **Region**: Same as resource group
     - **Pricing Plan**: `Free F1` (for testing) or `Basic B1` (for production)
   - **Review + Create** → **Create**

### 1.4 Create Web App

1. In your resource group, click "Create a resource"
2. Search for "Web App" and select it
3. Click "Create"
4. Fill in details:
   - **Basics Tab**:
     - **Resource Group**: Select your resource group
     - **Name**: `dale-rogers-portfolio` (must be globally unique)
     - **Publish**: `Code`
     - **Runtime Stack**: `Node 20 LTS`
     - **Operating System**: `Linux`
     - **Region**: Same as resource group
     - **App Service Plan**: Select your plan
   - **Review + Create** → **Create**

---

## Step 2: Configure Web App Settings

### 2.1 Application Settings

1. Go to your Web App resource
2. In left menu, click "Configuration" → "Application settings"
3. Add these settings:
   ```
   NODE_ENV = production
   SITE_URL = https://your-app-name.azurewebsites.net
   AZURE_WEBAPP_NAME = your-app-name
   ```
4. Click "Save"

### 2.2 General Settings

1. In left menu, click "Configuration" → "General settings"
2. Set:
   - **Stack**: `Node`
   - **Major version**: `20`
   - **Minor version**: `LTS`
   - **Startup Command**: Leave empty (will use package.json scripts)
3. Click "Save"

### 2.3 Custom Domains (Optional)

1. In left menu, click "Custom domains"
2. Click "Add custom domain"
3. Enter your domain (e.g., `dale-rogers.com`)
4. Follow DNS verification steps
5. Add SSL certificate if needed

---

## Step 3: Get Deployment Credentials

### 3.1 Download Publish Profile

1. In your Web App, click "Get publish profile"
2. Click "Download publish profile"
3. Save the `.publishsettings` file securely
4. **IMPORTANT**: Keep this file secure - it contains deployment credentials

### 3.2 Extract Publish Profile Content

1. Open the `.publishsettings` file in a text editor
2. Copy the entire content (it's XML)
3. You'll need this for GitHub Secrets

---

## Step 4: GitHub Repository Setup

### 4.1 Create Environments

1. Go to your GitHub repository
2. Click "Settings" → "Environments"
3. Click "New environment"
4. Create `staging` environment:
   - **Environment name**: `staging`
   - **Protection rules**: Add branch protection if needed
5. Create `production` environment:
   - **Environment name**: `production`
   - **Protection rules**: Add branch protection if needed

### 4.2 Add GitHub Secrets

1. In your repository, go to "Settings" → "Secrets and variables" → "Actions"
2. Click "New repository secret"
3. Add these secrets:

   **For Staging:**

   ```
   AZURE_WEBAPP_NAME = your-staging-app-name
   AZURE_WEBAPP_PUBLISH_PROFILE = [paste staging publish profile content]
   AZURE_WEBAPP_URL = https://your-staging-app.azurewebsites.net
   ```

   **For Production:**

   ```
   AZURE_WEBAPP_NAME = your-production-app-name
   AZURE_WEBAPP_PUBLISH_PROFILE = [paste production publish profile content]
   AZURE_WEBAPP_URL = https://your-production-app.azurewebsites.net
   ```

### 4.3 Environment-Specific Secrets

1. Go to "Settings" → "Environments"
2. Click on `staging` environment
3. Click "Add secret"
4. Add the staging-specific secrets
5. Repeat for `production` environment

---

## Step 5: Test Deployment

### 5.1 Manual Deployment Test

1. Push a small change to your `staging` branch
2. Go to "Actions" tab in GitHub
3. Watch the "Deploy to Azure" workflow run
4. Check for any errors in the logs

### 5.2 Verify Deployment

1. Go to your Azure Web App URL
2. Check if the site loads
3. Test the health endpoint: `/api/health`
4. Verify your portfolio content displays correctly

---

## Step 6: Production Deployment

### 6.1 Deploy to Production

1. Merge your staging changes to `main` branch
2. The production deployment will trigger automatically
3. Monitor the deployment in GitHub Actions
4. Verify production site is working

### 6.2 Post-Deployment Verification

1. Check production site functionality
2. Test all major features
3. Verify performance metrics
4. Check error logs in Azure

---

## Step 7: Monitoring and Maintenance

### 7.1 Set Up Monitoring

1. In Azure Portal, go to your Web App
2. Click "Application Insights" → "Turn on Application Insights"
3. Create new resource or use existing
4. Configure basic monitoring

### 7.2 Set Up Logs

1. In your Web App, go to "Monitoring" → "Log stream"
2. Enable application logging
3. Set up log retention policies

### 7.3 Performance Monitoring

1. Set up Azure Monitor alerts
2. Configure uptime monitoring
3. Set up performance metrics tracking

---

## Troubleshooting Common Issues

### Deployment Fails

- Check GitHub Actions logs for specific errors
- Verify Azure credentials are correct
- Ensure Web App is running and accessible
- Check if build artifacts are generated correctly

### App Won't Start

- Check application settings in Azure
- Verify startup command is correct
- Check application logs in Azure
- Ensure all environment variables are set

### Performance Issues

- Check App Service Plan tier (upgrade if needed)
- Enable Application Insights for detailed monitoring
- Optimize your Astro build output
- Consider CDN for static assets

---

## Cost Optimization

### Free Tier (F1)

- Good for testing and development
- Limited resources and features
- No custom domains
- No SSL certificates

### Basic Tier (B1)

- Suitable for small production sites
- Custom domains support
- SSL certificates included
- Better performance than free tier

### Standard Tier (S1)

- Recommended for production
- Auto-scaling capabilities
- Better performance and reliability
- More advanced features

---

## Security Considerations

### Environment Variables

- Never commit secrets to code
- Use Azure Key Vault for sensitive data
- Rotate credentials regularly
- Use least-privilege access

### Network Security

- Enable Azure Front Door for DDoS protection
- Configure network security groups
- Use private endpoints if needed
- Enable Azure Security Center

---

## Next Steps

After successful deployment, consider:

1. **Set up custom domain and SSL**
2. **Configure Azure CDN for better performance**
3. **Set up automated backups**
4. **Implement monitoring and alerting**
5. **Set up staging environment for testing**
6. **Configure CI/CD for other branches**

---

## Support Resources

- [Azure App Service Documentation](https://docs.microsoft.com/en-us/azure/app-service/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Astro Deployment Guide](https://docs.astro.build/en/guides/deploy/)
- [Azure Status Page](https://status.azure.com/)

---

## Quick Reference Commands

```bash
# Check Azure CLI installation
az --version

# Login to Azure
az login

# List subscriptions
az account list

# Set subscription
az account set --subscription "Your Subscription Name"

# List resource groups
az group list

# List web apps
az webapp list --resource-group "your-resource-group-name"
```

---

**Note**: This guide assumes you're using Azure App Service. For more advanced scenarios, consider Azure Container Apps, Azure Kubernetes Service, or Azure Static Web Apps.
