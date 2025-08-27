# Deployment Guide

## Overview

This portfolio site is deployed using **Azure Static Web Apps (SWA)**, which provides a modern, serverless hosting solution that's perfect for static Astro sites.

## Current Deployment Status ✅

- **Azure Static Web App**: `dale-rogers-portfolio`
- **Resource Group**: `dale-rogers-portfolio-rg`
- **Location**: Australia East (West Europe)
- **Production URL**: https://wonderful-pond-07724bc03.1.azurestaticapps.net
- **Preview URL**: https://wonderful-pond-07724bc03-preview.westeurope.1.azurestaticapps.net

## Why Azure Static Web Apps?

- **Simpler**: No Docker containers or server management
- **Cheaper**: Pay-per-use pricing with generous free tier
- **Faster**: Global CDN with edge locations
- **Purpose-built**: Optimized for static sites and JAMstack applications
- **Automatic**: CI/CD integration with GitHub

## Architecture

### Static Output

- **Build Output**: `astro build` generates static HTML/CSS/JS files
- **No Server**: All pages are pre-rendered at build time
- **CDN**: Content served from Azure's global edge network

### Deployment Flow

1. **GitHub Push** → Triggers GitHub Actions workflow
2. **Build** → `pnpm install && pnpm build`
3. **Deploy** → Files uploaded to Azure Static Web Apps
4. **CDN** → Content distributed globally

## Deployment Methods

### Method 1: Direct Deployment (CLI)

Use this method for immediate deployments or testing:

```bash
# 1. Build the project
pnpm run build:swa

# 2. Deploy using Azure Static Web Apps CLI
npx @azure/static-web-apps-cli@latest deploy dist \
  --deployment-token YOUR_DEPLOYMENT_TOKEN
```

**Get Deployment Token:**

```bash
az staticwebapp secrets list \
  --name dale-rogers-portfolio \
  --resource-group dale-rogers-portfolio-rg \
  --query "properties.apiKey" \
  --output tsv
```

### Method 2: GitHub Actions (Automated)

**Prerequisites:**

- GitHub repository connected to Azure Static Web Apps
- `AZURE_STATIC_WEB_APPS_API_TOKEN` secret configured in GitHub

**Automatic Deployment:**

1. Push changes to `main` branch
2. GitHub Actions automatically builds and deploys
3. Site updates within 2-3 minutes

## Setup Instructions

### 1. Azure Static Web Apps (Already Configured)

Your Azure Static Web App is already set up with:

- **Name**: `dale-rogers-portfolio`
- **Resource Group**: `dale-rogers-portfolio-rg`
- **Location**: Australia East
- **Source**: GitHub repository integration

### 2. GitHub Actions Workflow

The `.github/workflows/azure-static-web-apps.yml` workflow automatically:

- Builds the project with `pnpm run build`
- Deploys to Azure Static Web Apps
- Handles preview deployments for pull requests

**Required GitHub Secret:**

- **Name**: `AZURE_STATIC_WEB_APPS_API_TOKEN`
- **Value**: `738a2259881cbec5b79e544624dcf6c0f590d1b514486e00ba3febb38e9a3ee401-66ac9885-d6f2-4a49-8dcc-a7d90b493a05003302107724bc03`

### 3. Environment Variables

No environment variables needed for static deployment.

## Build Process

### Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

### Production Build

```bash
pnpm run build:swa
```

This command builds the project and outputs files to the `dist/` directory.

## Configuration Files

### `astro.config.mjs`

```javascript
export default defineConfig({
  output: 'static', // Static output mode
  site: 'https://dale-rogers.com.au',
  // ... other config
});
```

### `staticwebapp.config.json`

- **Routing**: Handles SPA routing and fallbacks
- **Caching**: Optimized cache headers for assets
- **Security**: Headers and redirects

### `.github/workflows/azure-static-web-apps.yml`

- **Build**: Node.js 20 + pnpm setup
- **Deploy**: Automatic deployment to Azure
- **Preview**: PR-based preview deployments

## Performance Features

### Caching Strategy

- **Assets**: Immutable cache for CSS/JS files (1 year)
- **Images**: Long-term caching for static assets
- **HTML**: Appropriate cache headers for content

### CDN Benefits

- **Global Distribution**: Content served from edge locations
- **Automatic Scaling**: Handles traffic spikes seamlessly
- **HTTPS**: Automatic SSL/TLS certificates

## Monitoring & Analytics

### Azure Insights

- **Performance**: Page load times and metrics
- **Errors**: Client-side error tracking
- **Usage**: Traffic patterns and user behavior

### Custom Analytics

- **Google Analytics**: Client-side tracking
- **Performance Monitoring**: Core Web Vitals

## Troubleshooting

### Common Issues

1. **Build Failures**:

   ```bash
   # Check for TypeScript errors
   pnpm run typecheck

   # Verify build locally
   pnpm run build
   ```

2. **Deployment Issues**:
   - Check GitHub Actions logs
   - Verify Azure Static Web Apps configuration
   - Ensure build output is in `dist/` directory

3. **Routing Problems**:
   - Verify `staticwebapp.config.json` configuration
   - Check for proper fallback routes
   - Test navigation fallbacks

### Debug Commands

```bash
# Check build output
ls -la dist/

# Verify static files
find dist/ -name "*.html" | head -5

# Test local preview
pnpm run preview

# Check Azure Static Web App status
az staticwebapp show \
  --name dale-rogers-portfolio \
  --resource-group dale-rogers-portfolio-rg
```

## Migration from Docker

### What Changed

- **Removed**: Dockerfile, docker-compose.yml
- **Removed**: @astrojs/node adapter
- **Removed**: Server-side API routes
- **Added**: Static output configuration
- **Added**: Azure Static Web Apps workflow

### Benefits

- **Simpler**: No container orchestration
- **Faster**: Direct file serving from CDN
- **Cheaper**: Pay-per-use pricing
- **Reliable**: Azure-managed infrastructure

## Future Considerations

### Potential Enhancements

- **API Routes**: Azure Functions for dynamic functionality
- **Database**: Azure Cosmos DB for content management
- **Search**: Azure Cognitive Search for advanced search
- **Media**: Azure Media Services for video content

### Scaling

- **Automatic**: Azure handles traffic scaling
- **Global**: CDN distribution worldwide
- **Cost-effective**: Pay only for what you use

## Support

For deployment issues:

1. Check GitHub Actions logs
2. Review Azure Static Web Apps diagnostics
3. Consult Azure documentation
4. Contact Azure support if needed

---

**Last Updated**: December 2024
**Version**: 2.1 (Azure Static Web Apps - Live)
**Status**: ✅ Production Deployed
