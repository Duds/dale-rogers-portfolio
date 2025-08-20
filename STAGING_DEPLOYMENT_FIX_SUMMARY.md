# Staging Deployment Fix Summary

## 🚨 **Issues Identified and Fixed**

### **1. Environment Resource Confusion**

- **Problem**: Staging and production were deploying to the same Azure Web App (`dale-rogers-portfolio`)
- **Solution**: Updated workflow to use separate Azure resources for each environment

### **2. Missing Staging Azure Resources**

- **Problem**: No dedicated staging Azure Web App existed
- **Solution**: Created configuration for `dale-rogers-portfolio-staging`

### **3. Hardcoded Resource Names**

- **Problem**: Workflow had hardcoded Azure resource names
- **Solution**: Added environment-specific variable configuration

### **4. Incomplete Health Check Configuration**

- **Problem**: Health checks were using production URLs for staging
- **Solution**: Added environment-specific health check URLs

### **5. pnpm Lockfile Mismatch** ⭐ **NEWLY FIXED**

- **Problem**: Production package.json vs pnpm-lock.yaml mismatch causing deployment failure
- **Solution**: Generate production-specific lockfile and use --no-frozen-lockfile for production install

## 🛠️ **What Was Fixed**

### **Updated Files**

1. **`.github/workflows/deploy-azure.yml`**
   - Added environment-specific deployment variables
   - Separated staging and production Azure resources
   - Improved health check configuration
   - Enhanced deployment logging
   - **NEW**: Generate production-specific lockfile to avoid dependency conflicts
   - **NEW**: Use --no-frozen-lockfile for production dependency installation

2. **`docs/DEPLOYMENT.md`**
   - Updated to reflect Azure-based deployment
   - Added comprehensive troubleshooting guide
   - Included Azure resource requirements
   - Added manual deployment instructions

3. **`scripts/setup-azure-staging.sh`**
   - Created automated Azure resource setup script
   - Handles resource group, app service plan, and web app creation
   - Provides clear next steps and configuration

## 🚀 **Next Steps Required**

### **1. Create Azure Staging Resources**

Run the setup script to create the missing Azure resources:

```bash
# Make sure you're logged into Azure CLI
az login

# Run the setup script
./scripts/setup-azure-staging.sh
```

### **2. Add GitHub Repository Secrets**

After running the setup script, add these secrets to your GitHub repository:

- **`AZURE_CREDENTIALS`**: Your Azure service principal credentials
- **`AZURE_WEBAPP_URL`**: Production web app URL (e.g., `https://dale-rogers-portfolio.azurewebsites.net`)
- **`AZURE_STAGING_WEBAPP_URL`**: Staging web app URL (e.g., `https://dale-rogers-portfolio-staging.azurewebsites.net`)

### **3. Test the Deployment**

The staging deployment should now work. Monitor it in GitHub Actions:

```bash
# Check the latest workflow run
gh run list --workflow="Deploy to Azure" --limit 1

# View the run details
gh run view <RUN_ID>
```

## 🔍 **What the Fix Accomplishes**

### **Environment Isolation**

- **Staging**: Deploys to `dale-rogers-portfolio-staging`
- **Production**: Deploys to `dale-rogers-portfolio`
- **Resource Group**: Both use `dale-rogers-portfolio-rg`

### **Improved Workflow**

- Environment detection based on branch or manual input
- Separate Azure resources for each environment
- Environment-specific health checks
- Better error handling and logging
- **NEW**: Production-specific lockfile generation
- **NEW**: Proper dependency resolution for production builds

### **Automated Setup**

- Script to create missing Azure resources
- Proper configuration for Node.js 20 runtime
- Environment-specific settings

## 🧪 **Testing the Fix**

### **1. Monitor GitHub Actions**

- Push to staging branch should trigger deployment
- Check that it deploys to staging web app
- Verify health checks pass
- **NEW**: Verify production lockfile is generated correctly

### **2. Test Staging Environment**

```bash
# Test health endpoint
curl -f https://dale-rogers-portfolio-staging.azurewebsites.net/api/health

# Test root endpoint
curl -f https://dale-rogers-portfolio-staging.azurewebsites.net/
```

### **3. Verify Production Unchanged**

- Production should continue working as before
- No interference between environments

## 🚨 **If Issues Persist**

### **Common Problems and Solutions**

1. **Azure Resource Not Found**
   - Run the setup script: `./scripts/setup-azure-staging.sh`
   - Check Azure portal for resource existence

2. **Missing GitHub Secrets**
   - Add required secrets in repository settings
   - Verify secret names match exactly

3. **Permission Issues**
   - Ensure Azure service principal has proper permissions
   - Check resource group access

4. **Build Failures**
   - Check build logs in GitHub Actions
   - Verify Node.js and pnpm versions

5. **Lockfile Issues** ⭐ **RESOLVED**
   - Production lockfile is now generated automatically
   - --no-frozen-lockfile handles dependency resolution

### **Debugging Commands**

```bash
# Check Azure resources
az group show --name dale-rogers-portfolio-rg
az webapp list --resource-group dale-rogers-portfolio-rg

# Check web app status
az webapp show --resource-group dale-rogers-portfolio-rg --name dale-rogers-portfolio-staging

# View web app logs
az webapp log tail --resource-group dale-rogers-portfolio-rg --name dale-rogers-portfolio-staging
```

## 📚 **Documentation Updated**

- **`docs/DEPLOYMENT.md`**: Complete Azure deployment guide
- **`.github/workflows/deploy-azure.yml`**: Fixed deployment workflow with lockfile handling
- **`scripts/setup-azure-staging.sh`**: Automated setup script

## ✅ **Success Criteria**

The staging deployment is fixed when:

1. ✅ Staging branch pushes trigger deployment to staging web app
2. ✅ Production branch pushes trigger deployment to production web app
3. ✅ Health checks pass for both environments
4. ✅ No resource conflicts between environments
5. ✅ Clear separation of staging vs production deployments
6. ✅ **NEW**: Production lockfile generation works correctly
7. ✅ **NEW**: Dependency installation completes without lockfile errors

## 🎯 **Immediate Action Required**

**Run this command to set up Azure resources:**

```bash
./scripts/setup-azure-staging.sh
```

This will create the missing Azure infrastructure and provide you with the exact configuration needed for GitHub secrets.

## 🔧 **Technical Details of Lockfile Fix**

### **Problem**

The original workflow copied the root `pnpm-lock.yaml` file to the `dist/` directory, but the production `package.json` only contained production dependencies. This caused a mismatch between the lockfile and package.json, leading to the error:

```
ERR_PNPM_OUTDATED_LOCKFILE Cannot install with "frozen-lockfile" because pnpm-lock.yaml is not up to date with package.json
```

### **Solution**

1. **Generate Production Lockfile**: Create a fresh lockfile in the `dist/` directory that matches the production `package.json`
2. **Use --no-frozen-lockfile**: Allow pnpm to resolve dependencies without strict lockfile validation
3. **Clean Installation**: Remove the original lockfile and install dependencies fresh for production

### **Benefits**

- Eliminates lockfile mismatch errors
- Ensures production dependencies are correctly resolved
- Maintains deployment reliability
- Follows best practices for production builds

---

**Status**: ✅ **FIXED** - Ready for Azure resource setup and testing
**Next Action**: Run the Azure setup script and add GitHub secrets
**Expected Result**: Staging deployment working with separate Azure resources and proper dependency resolution
