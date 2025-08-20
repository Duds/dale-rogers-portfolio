# Azure Deployment Quick Reference

## 🚀 Quick Start (5 minutes)

### 1. Run Setup Script

```bash
./scripts/setup-azure.sh
```

### 2. Add GitHub Secrets

Go to: `Settings` → `Secrets and variables` → `Actions`

**Required Secrets:**

- `AZURE_WEBAPP_NAME` = your-app-name
- `AZURE_WEBAPP_PUBLISH_PROFILE` = [paste XML content]
- `AZURE_WEBAPP_URL` = https://your-app-name.azurewebsites.net

### 3. Deploy

```bash
git push origin staging  # Deploy to staging
git push origin main     # Deploy to production
```

---

## 📋 What's Been Created

### GitHub Workflows

- ✅ `.github/workflows/ci.yml` - Quality gates and testing
- ✅ `.github/workflows/deploy-azure.yml` - Azure deployment

### Azure Infrastructure

- ✅ Resource Group: `dale-rogers-portfolio-rg`
- ✅ App Service Plan: `dale-rogers-portfolio-plan`
- ✅ Web App: `dale-rogers-portfolio`
- ✅ Health endpoint: `/api/health`

### Documentation

- ✅ `azure-deployment-guide.md` - Complete step-by-step guide
- ✅ `docs/DEPLOYMENT.md` - Updated deployment documentation
- ✅ `scripts/setup-azure.sh` - Automated Azure setup

---

## 🔧 Manual Azure Setup (if script fails)

### 1. Create Resource Group

```bash
az group create --name dale-rogers-portfolio-rg --location australiaeast
```

### 2. Create App Service Plan

```bash
az appservice plan create \
  --name dale-rogers-portfolio-plan \
  --resource-group dale-rogers-portfolio-rg \
  --location australiaeast \
  --sku B1 \
  --is-linux
```

### 3. Create Web App

```bash
az webapp create \
  --name dale-rogers-portfolio \
  --resource-group dale-rogers-portfolio-rg \
  --plan dale-rogers-portfolio-plan \
  --runtime "NODE|20-lts"
```

### 4. Get Publish Profile

```bash
az webapp deployment list-publishing-profiles \
  --name dale-rogers-portfolio \
  --resource-group dale-rogers-portfolio-rg \
  --xml > publish-profile.xml
```

---

## 🚨 Troubleshooting

### Common Issues

**Deployment Fails:**

- Check GitHub Actions logs
- Verify Azure credentials
- Ensure Web App is running

**App Won't Start:**

- Check application settings
- Verify startup command
- Check application logs

**Build Fails:**

- Run `pnpm run dev:health` locally
- Check TypeScript compilation
- Verify all tests pass

### Quick Fixes

```bash
# Local health check
pnpm run dev:health

# Clear build cache
rm -rf dist/

# Rebuild
pnpm run build

# Test locally
pnpm run preview
```

---

## 💰 Cost Estimation

| Service              | Tier          | Cost/Month |
| -------------------- | ------------- | ---------- |
| App Service          | Free (F1)     | $0         |
| App Service          | Basic (B1)    | ~$15       |
| App Service          | Standard (S1) | ~$75       |
| Application Insights | Per GB        | $2.30/GB   |

**Recommended for production:** Basic B1 (~$15/month)

---

## 📞 Support

- **Azure Issues**: Check Azure status page
- **GitHub Actions**: Check workflow logs
- **Local Issues**: Run `pnpm run dev:health`
- **Documentation**: See `azure-deployment-guide.md`

---

## 🎯 Next Steps After Deployment

1. **Set up custom domain** (optional)
2. **Configure SSL certificate**
3. **Set up monitoring alerts**
4. **Configure CDN for performance**
5. **Set up automated backups**

---

**Remember**: The setup script automates most of this process. If you encounter issues, check the detailed guide in `azure-deployment-guide.md`.
