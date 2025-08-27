# Azure Static Web Apps Deployment

## 🎯 **Overview**

This portfolio is deployed using **Azure Static Web Apps** with automated CI/CD via GitHub Actions. The deployment strategy uses branch-based deployment to separate preview and production environments.

## 🏗️ **Azure Configuration**

### **Static Web App Details**

- **Name**: `dale-rogers-portfolio`
- **Resource Group**: `dale-rogers-portfolio-rg`
- **Location**: `West Europe`
- **SKU**: `Free`
- **Default Branch**: `main`

### **Environments**

#### 1. Default Environment (Production)

- **Name**: `default`
- **URL**: `https://wonderful-pond-07724bc03.1.azurestaticapps.net`
- **Branch**: `main`
- **Purpose**: Production deployment
- **Status**: `Ready`

#### 2. Preview Environment

- **Name**: `preview`
- **URL**: `https://wonderful-pond-07724bc03-preview.westeurope.1.azurestaticapps.net`
- **Branch**: `preview`
- **Purpose**: Preview/testing deployment
- **Status**: `Ready`

## 🔄 **Branch Mapping Strategy**

Azure Static Web Apps automatically maps branches to environments:

| Branch    | Environment | URL                                                                 | Purpose         |
| --------- | ----------- | ------------------------------------------------------------------- | --------------- |
| `main`    | `default`   | `wonderful-pond-07724bc03.1.azurestaticapps.net`                    | Production      |
| `preview` | `preview`   | `wonderful-pond-07724bc03-preview.westeurope.1.azurestaticapps.net` | Preview/Testing |

## 🚀 **Deployment Workflows**

### **Production Deployment** (`.github/workflows/azure-static-web-apps.yml`)

- **Trigger**:
  - `workflow_run` from "Automated Release" workflow completion on `main` branch
  - Direct `push` to `main` branch
- **Target**: `default` environment (Production)
- **Azure App**: `dale-rogers-portfolio`
- **Deployment Environment**: `default`

### **Preview Deployment** (`.github/workflows/azure-static-web-apps-preview.yml`)

- **Trigger**:
  - `workflow_run` from "Automated Release" workflow completion on `main` branch
  - Direct `push` to `preview` branch
- **Target**: `preview` environment
- **Azure App**: `dale-rogers-portfolio`
- **Deployment Environment**: `preview`

## 🔑 **Required Secrets**

### **Azure Static Web Apps API Token**

- **Name**: `AZURE_STATIC_WEB_APPS_API_TOKEN`
- **Purpose**: Authentication for Azure Static Web Apps deployment
- **Scope**: Repository secrets
- **Permissions**: Deploy to Azure Static Web Apps

## 📁 **Deployment Configuration**

### **Build Output**

- **Source**: `dist/` folder (Astro build output)
- **App Location**: `dist` (built app content)
- **Output Location**: `''` (no additional processing)
- **Skip Build**: `true` (build happens in GitHub Actions)

### **Azure Static Web Apps Config**

- **File**: `staticwebapp.config.json`
- **Routes**: SPA routing with fallback to `index.html`
- **Security**: Content Security Policy, X-Frame-Options, etc.
- **API**: Anonymous access to `/api/*` routes

## 🔄 **Deployment Process**

### **1. Automated Release**

1. Push to `main` branch triggers "Automated Release" workflow
2. Semantic versioning analysis and package.json update
3. GitHub release creation
4. Version synchronization across files

### **2. Production Deployment**

1. "Automated Release" completion triggers "Deploy to Production"
2. Build Astro application with production environment variables
3. Deploy to Azure `default` environment
4. Update production URL: `wonderful-pond-07724bc03.1.azurestaticapps.net`

### **3. Preview Deployment**

1. "Automated Release" completion triggers "Deploy to Preview"
2. Build Astro application with preview environment variables
3. Deploy to Azure `preview` environment
4. Update preview URL: `wonderful-pond-07724bc03-preview.westeurope.1.azurestaticapps.net`

## 🎨 **Environment Variables**

### **Build-Time Variables**

- `ASTRO_COMMIT_HASH`: Git commit SHA
- `ASTRO_BRANCH`: Git branch name
- `ASTRO_ENVIRONMENT`: `production` or `preview`

### **Runtime Detection**

- **Development**: `import.meta.env.DEV === true`
- **Preview**: Hostname contains `preview` or `azurestaticapps.net`
- **Production**: Hostname matches production URL

## 🚨 **Deployment Rules**

### **Branch Protection**

- **`main` branch**: Protected, requires PR approval
- **`preview` branch**: Protected, requires PR approval
- **Direct pushes**: Allowed for emergency deployments

### **Deployment Order**

1. **Automated Release** must complete successfully
2. **Production Deployment** triggers after release
3. **Preview Deployment** triggers after release
4. Both deployments run in parallel after release completion

### **Rollback Strategy**

- **Production**: Deploy previous version from `main` branch
- **Preview**: Deploy previous version from `preview` branch
- **Emergency**: Direct push to trigger immediate deployment

## 🔍 **Monitoring & Troubleshooting**

### **Deployment Status**

- **GitHub Actions**: Check workflow run status
- **Azure Portal**: Monitor deployment history
- **URLs**: Verify content updates at deployment URLs

### **Common Issues**

1. **Missing Azure Token**: Ensure `AZURE_STATIC_WEB_APPS_API_TOKEN` secret exists
2. **Build Failures**: Check Astro build output and dependencies
3. **Deployment Failures**: Verify Azure Static Web Apps configuration
4. **Environment Mismatch**: Ensure correct environment targeting

### **Debug Commands**

```bash
# Check Azure Static Web Apps
az staticwebapp show --name dale-rogers-portfolio

# List environments
az staticwebapp environment list --name dale-rogers-portfolio

# Check deployment status
gh run list --workflow="Deploy to Production"
gh run list --workflow="Deploy to Preview"
```

## 📋 **Deployment Checklist**

### **Before Deployment**

- [ ] Azure Static Web Apps properly configured
- [ ] Required secrets added to GitHub repository
- [ ] Branch protection rules configured
- [ ] Workflow files updated with correct Azure app name

### **During Deployment**

- [ ] Automated Release workflow completes successfully
- [ ] Production deployment targets `default` environment
- [ ] Preview deployment targets `preview` environment
- [ ] Both deployments complete without errors

### **After Deployment**

- [ ] Production URL shows updated content
- [ ] Preview URL shows updated content
- [ ] Version badge displays correct version
- [ ] Environment detection works correctly

## 🔗 **Related Documentation**

- [GitHub Workflows](../.github/workflows/)
- [Deployment Process](./DEPLOYMENT.md)
- [Release Process](./RELEASE_PROCESS.md)
- [Azure Static Web Apps Configuration](../staticwebapp.config.json)

---

**Last Updated**: August 27, 2025
**Azure App**: `dale-rogers-portfolio`
**Environments**: `default` (Production), `preview` (Preview)
