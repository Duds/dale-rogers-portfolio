# Deployment Guide

## Overview

This document outlines the deployment process for the portfolio website, ensuring consistent and reliable deployments across environments using Azure App Service and GitHub Actions.

## Environments

### Development

- URL: https://dev.dalerogers.dev
- Branch: `develop`
- Auto-deploys: Yes
- Region: Australia East (Sydney), Australia

### Staging

- URL: https://staging.dalerogers.dev
- Branch: `staging`
- Auto-deploys: Yes
- Region: Australia East (Sydney), Australia

### Production

- URL: https://dalerogers.dev
- Branch: `main`
- Auto-deploys: Yes
- Region: Australia East (Sydney), Australia

## Deployment Process

### Prerequisites

- Node.js 20+
- pnpm 10.14.0+
- Azure subscription
- Environment variables configured
- GitHub repository with Azure deployment workflows

### Environment Variables

```env
# Required
NODE_ENV=production
SITE_URL=https://dale-rogers.com
AZURE_WEBAPP_NAME=your-app-name

# Optional
ANALYTICS_ID=your_analytics_id
SENTRY_DSN=your_sentry_dsn
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

### Deployment Steps

1. **Preparation**

   ```bash
   # Install dependencies
   pnpm install

   # Build project
   pnpm run build

   # Run tests
   pnpm run test:run
   pnpm run e2e
   ```

2. **Deployment**

   The deployment is automated via GitHub Actions:
   - Push to `staging` branch → deploys to staging environment
   - Push to `main` branch → deploys to production environment
   - Manual deployment available via GitHub Actions UI

3. **Verification**
   - Check deployment status in GitHub Actions
   - Run smoke tests on deployed site
   - Verify health endpoint: `/api/health`
   - Monitor error rates in Azure

## Continuous Deployment

### GitHub Actions Workflow

The deployment uses two main workflows:

1. **CI Pipeline** (`.github/workflows/ci.yml`)
   - Runs on all branches and PRs
   - Quality gates: type checking, linting, testing, building
   - Uploads build artifacts

2. **Azure Deployment** (`.github/workflows/deploy-azure.yml`)
   - Runs on `main` and `staging` branches
   - Deploys to Azure App Service
   - Includes health checks and notifications

### Quality Gates

- All tests passing (unit, integration, E2E)
- TypeScript compilation successful
- No ESLint errors
- Prettier formatting correct
- Performance benchmarks met
- Security scan passed

## Azure Infrastructure

### App Service Configuration

- **Runtime**: Node.js 20 LTS
- **Operating System**: Linux
- **Pricing Tier**: Basic B1 (recommended for production)
- **Region**: Australia East (Sydney)

### Resource Group Structure

```
dale-rogers-portfolio-rg/
├── dale-rogers-portfolio-plan (App Service Plan)
├── dale-rogers-portfolio (Web App)
├── dale-rogers-portfolio-insights (Application Insights)
└── dale-rogers-portfolio-vault (Key Vault - optional)
```

## Rollback Procedure

1. **Identify Issue**
   - Monitor error rates in Azure
   - Check user reports
   - Review application logs

2. **Initiate Rollback**

   ```bash
   # Revert to previous commit
   git revert HEAD
   git push origin main

   # Or manually trigger previous deployment
   # Go to GitHub Actions → Deploy to Azure → Re-run jobs
   ```

3. **Verify Rollback**
   - Check application status
   - Verify functionality
   - Monitor metrics

## Performance Monitoring

### Metrics

- Page load time
- Time to interactive
- First contentful paint
- Core Web Vitals
- Error rates
- Azure App Service metrics

### Tools

- Azure Application Insights
- Azure Monitor
- Google Analytics
- Sentry (optional)
- Lighthouse CI

## Security Measures

### SSL/TLS

- Enforced HTTPS
- TLS 1.3
- HSTS enabled
- Secure cookies

### Security Headers

```typescript
// Configured in Astro for security
export const securityHeaders = {
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Frame-Options": "SAMEORIGIN",
  "X-XSS-Protection": "1; mode=block",
  "X-Content-Type-Options": "nosniff",
};
```

### Azure Security

- Azure Security Center enabled
- Network security groups configured
- Private endpoints (if needed)
- Azure Key Vault for secrets

## Backup Strategy

### Application Backups

- Git repository as primary backup
- Azure App Service backup (if enabled)
- Build artifacts stored in GitHub Actions
- Environment configuration in GitHub Secrets

### Asset Backups

- Static assets in Git repository
- Images and media files in public directory
- CDN replication via Azure Front Door
- Geographic redundancy via Azure regions

## Maintenance Windows

### Scheduled Maintenance

- Time: 02:00-04:00 AEST
- Frequency: Monthly
- Notification: 7 days prior
- Status page updates

### Emergency Maintenance

- Immediate response
- Status page updates
- User notifications
- Post-mortem reports

## Monitoring

### Uptime Monitoring

- Azure App Service monitoring
- Azure Monitor alerts
- Status page
- Alert notifications

### Performance Monitoring

- Azure Application Insights
- Lighthouse CI
- Core Web Vitals
- User timing metrics

## Incident Response

### Process

1. Detection (Azure Monitor + Application Insights)
2. Response (Automated alerts + manual intervention)
3. Resolution (Rollback or hotfix)
4. Post-mortem (Documentation + prevention)
5. Prevention (Process improvements)

### Communication

- Status page updates
- Email notifications
- Social media updates
- Support channels

## Documentation

### Deployment Records

- Version deployed
- Deployment time
- Configuration changes
- Environment variables

### Change Log

- Feature updates
- Bug fixes
- Security patches
- Performance improvements

## Contact

### Support

- Email: support@dalerogers.dev
- Hours: 09:00-17:00 AEST
- Response time: < 4 hours
- Emergency: 24/7

### Escalation

1. On-call engineer
2. Technical lead
3. System administrator
4. Project manager

## Resources

### Documentation

- [Azure App Service Docs](https://docs.microsoft.com/en-us/azure/app-service/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Astro Deployment](https://docs.astro.build/guides/deploy)
- [Azure Deployment Guide](./azure-deployment-guide.md)

### Tools

- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/)
- [pnpm](https://pnpm.io)
- [TypeScript](https://www.typescriptlang.org)
- [ESLint](https://eslint.org)
- [GitHub Actions](https://github.com/features/actions)

## Quick Start Commands

```bash
# Local development
pnpm run dev:health
pnpm run dev

# Testing
pnpm run test:run
pnpm run e2e

# Building
pnpm run build
pnpm run preview

# Deployment (automatic via GitHub Actions)
git push origin staging  # Deploy to staging
git push origin main     # Deploy to production
```

## Cost Estimation

### Azure App Service Pricing (Australia East)

- **Free (F1)**: $0/month - Good for testing
- **Basic (B1)**: ~$15/month - Suitable for small production
- **Standard (S1)**: ~$75/month - Recommended for production
- **Premium (P1)**: ~$150/month - High-performance needs

### Additional Services

- **Application Insights**: $2.30/GB of data
- **Azure CDN**: $0.081/GB (first 10TB)
- **Key Vault**: $0.03/10K operations

**Total estimated cost for production**: $20-100/month depending on tier and usage.
