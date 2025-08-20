# Deployment Guide

## Overview

This document outlines the deployment process for the portfolio website, ensuring consistent and reliable deployments across environments.

## Environments

### Development

- URL: https://dev.dalerogers.dev
- Branch: `develop`
- Auto-deploys: Yes
- Region: Sydney, Australia

### Staging

- URL: https://staging.dalerogers.dev
- Branch: `staging`
- Auto-deploys: Yes
- Region: Sydney, Australia
- **Azure Web App**: `dale-rogers-portfolio-staging`
- **Resource Group**: `dale-rogers-portfolio-rg`

### Production

- URL: https://dalerogers.dev
- Branch: `main`
- Auto-deploys: Yes
- Region: Sydney, Australia
- **Azure Web App**: `dale-rogers-portfolio`
- **Resource Group**: `dale-rogers-portfolio-rg`

## Deployment Process

### Prerequisites

- Node.js 20+
- pnpm 10.14.0+
- Azure CLI configured
- Environment variables configured

### Environment Variables

```env
# Required for Azure deployment
AZURE_CREDENTIALS=your_azure_service_principal_credentials
AZURE_WEBAPP_URL=https://dale-rogers-portfolio.azurewebsites.net
AZURE_STAGING_WEBAPP_URL=https://dale-rogers-portfolio-staging.azurewebsites.net

# Optional
NODE_ENV=production
```

### Azure Resources Required

1. **Resource Group**: `dale-rogers-portfolio-rg`
2. **Production Web App**: `dale-rogers-portfolio`
3. **Staging Web App**: `dale-rogers-portfolio-staging`

### Deployment Steps

1. **Preparation**

   ```bash
   # Install dependencies
   pnpm install

   # Build project
   pnpm build

   # Run tests
   pnpm test:run
   ```

2. **Deployment**

   The deployment is automated via GitHub Actions:
   - **Staging**: Push to `staging` branch
   - **Production**: Push to `main` branch
   - **Manual**: Use workflow dispatch with environment selection

3. **Verification**
   - Check deployment status in GitHub Actions
   - Run smoke tests
   - Verify health endpoints
   - Monitor error rates

## Continuous Deployment

### GitHub Actions Workflow

```yaml
name: Deploy to Azure
on:
  push:
    branches: [main, staging]
  workflow_dispatch:
    inputs:
      environment:
        description: "Environment to deploy to"
        required: true
        default: "staging"
        type: choice
        options:
          - staging
          - production
```

### Quality Gates

- TypeScript compilation
- ESLint checks
- Prettier formatting
- Unit tests passing
- Build successful

## Troubleshooting

### Common Deployment Issues

#### 1. Azure Resource Not Found

**Symptoms**:

- Error: "Resource group 'dale-rogers-portfolio-rg' could not be found"
- Error: "Web app 'dale-rogers-portfolio-staging' not found"

**Solutions**:

```bash
# Check if resource group exists
az group show --name dale-rogers-portfolio-rg

# Create resource group if missing
az group create --name dale-rogers-portfolio-rg --location australiaeast

# Check if web apps exist
az webapp list --resource-group dale-rogers-portfolio-rg

# Create staging web app if missing
az webapp create \
  --resource-group dale-rogers-portfolio-rg \
  --plan dale-rogers-portfolio-plan \
  --name dale-rogers-portfolio-staging \
  --runtime "NODE|20-lts"
```

#### 2. Missing Environment Variables

**Symptoms**:

- Error: "AZURE_CREDENTIALS not found"
- Error: "AZURE_STAGING_WEBAPP_URL not found"

**Solutions**:

1. Check GitHub repository secrets
2. Add missing secrets:
   - `AZURE_CREDENTIALS`: Azure service principal credentials
   - `AZURE_WEBAPP_URL`: Production web app URL
   - `AZURE_STAGING_WEBAPP_URL`: Staging web app URL

#### 3. Build Failures

**Symptoms**:

- Error: "Production package.json not found"
- Error: "prepare script still exists"

**Solutions**:

1. Check build output in `dist/` directory
2. Verify `package.json` was created correctly
3. Ensure no `prepare` script in production build

#### 4. Health Check Failures

**Symptoms**:

- Error: "Health endpoint failed"
- Deployment succeeds but health check fails

**Solutions**:

1. Check web app is running
2. Verify health endpoint `/api/health` is accessible
3. Check web app configuration and environment variables

### Manual Deployment

If automated deployment fails, you can deploy manually:

```bash
# Build the project
pnpm build

# Create production package.json
node -e "
  const fs = require('fs');
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const prodPkg = {
    name: pkg.name,
    type: pkg.type,
    version: pkg.version,
    private: pkg.private,
    engines: pkg.engines,
    dependencies: pkg.dependencies,
    scripts: { start: 'node server/entry.mjs' }
  };
  fs.writeFileSync('dist/package.json', JSON.stringify(prodPkg, null, 2));
"

# Install production dependencies
cd dist
pnpm install --prod --frozen-lockfile
cd ..

# Deploy to Azure
az webapp deployment source config-zip \
  --resource-group dale-rogers-portfolio-rg \
  --name dale-rogers-portfolio-staging \
  --src dist/deployment.zip
```

### Debugging Commands

```bash
# Check Azure web app status
az webapp show --resource-group dale-rogers-portfolio-rg --name dale-rogers-portfolio-staging

# Check web app logs
az webapp log tail --resource-group dale-rogers-portfolio-rg --name dale-rogers-portfolio-staging

# Check deployment history
az webapp deployment list --resource-group dale-rogers-portfolio-rg --name dale-rogers-portfolio-staging

# Test health endpoint
curl -f https://dale-rogers-portfolio-staging.azurewebsites.net/api/health
```

## Security Considerations

1. **Azure Credentials**: Use service principal with minimal required permissions
2. **Environment Isolation**: Separate staging and production resources
3. **Secrets Management**: Store sensitive data in GitHub secrets
4. **Access Control**: Limit who can trigger deployments

## Monitoring and Alerts

1. **Azure Application Insights**: Monitor web app performance
2. **GitHub Actions**: Track deployment success/failure rates
3. **Health Checks**: Automated endpoint monitoring
4. **Error Tracking**: Monitor application errors and exceptions

## Rollback Procedures

1. **Immediate Rollback**: Use Azure Web App deployment slots
2. **Code Rollback**: Revert to previous commit and redeploy
3. **Database Rollback**: Restore from backup if needed

## Best Practices

1. **Always test in staging first**
2. **Use semantic versioning for releases**
3. **Monitor deployment metrics**
4. **Keep deployment logs for debugging**
5. **Automate health checks and monitoring**
6. **Use blue-green deployment for zero-downtime updates**

---

**Note**: This deployment guide is specific to Azure Web Apps. For other platforms, refer to their respective documentation.
