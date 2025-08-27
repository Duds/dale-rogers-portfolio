# Deployment Guide

## Overview

This portfolio site is deployed using **Azure Static Web Apps (SWA)**, which provides a modern, serverless hosting solution that's perfect for static Astro sites.

## Current Deployment Status ✅

- **Azure Static Web App**: `dale-rogers-portfolio`
- **Resource Group**: `dale-rogers-portfolio-rg`
- **Location**: Australia East (West Europe)
- **Production URL**: https://wonderful-pond-07724bc03.1.azurestaticapps.net
- **Preview URL**: https://wonderful-pond-07724bc03-preview.westeurope.1.azurestaticapps.net
- **Status**: ✅ **LIVE & AUTOMATED** - CI/CD pipeline working successfully
- **Last Deployment**: December 2024 (commit `0796c20`)
- **Current Version**: v0.0.2

## Versioning and Environment Identification

### Version Display

The site includes version information in multiple places:

1. **Navigation Badge**: Shows `v0.0.2 prod` in the top navigation
2. **Console Logs**: Version info logged to browser console
3. **Meta Tags**: Version, build time, and environment in HTML head
4. **Environment Colors**:
   - 🟢 **Green**: Production environment
   - 🟡 **Yellow**: Preview environment
   - 🔵 **Blue**: Development environment

### Environment URLs

- **Production**: `wonderful-pond-07724bc03.1.azurestaticapps.net` (Main branch)
- **Preview**: `wonderful-pond-07724bc03-preview.westeurope.1.azurestaticapps.net` (Preview branch)
- **Development**: Local development server

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

1. **GitHub Push** → Triggers appropriate workflow (Preview or Production)
2. **Build** → `pnpm install && pnpm build`
3. **Deploy** → Files uploaded to Azure Static Web Apps
4. **CDN** → Content distributed globally

## Deployment Methods

### Method 1: GitHub Actions (Automated) ✅ WORKING

**Two Separate Workflows:**

#### Production Workflow (`.github/workflows/azure-static-web-apps.yml`)

- **Trigger**: Push to `main` branch
- **Environment**: Production
- **URL**: `wonderful-pond-07724bc03.1.azurestaticapps.net`
- **Status**: ✅ **FULLY AUTOMATED**

#### Preview Workflow (`.github/workflows/azure-static-web-apps-preview.yml`)

- **Trigger**: Push to `preview` branch
- **Environment**: Preview
- **URL**: `wonderful-pond-07724bc03-preview.westeurope.1.azurestaticapps.net`
- **Status**: ✅ **FULLY AUTOMATED**

### Method 2: Direct CLI Deployment

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

## Setup Instructions

### 1. Azure Static Web Apps (Already Configured)

Your Azure Static Web App is already set up with:

- **Name**: `dale-rogers-portfolio`
- **Resource Group**: `dale-rogers-portfolio-rg`
- **Location**: Australia East
- **Source**: GitHub repository integration

### 2. GitHub Actions Workflows ✅ CONFIGURED

#### Production Workflow

The `.github/workflows/azure-static-web-apps.yml` workflow automatically:

- Builds the project with `pnpm run build`
- Deploys to Azure Static Web Apps **Production** environment
- Handles preview deployments for pull requests

#### Preview Workflow

The `.github/workflows/azure-static-web-apps-preview.yml` workflow automatically:

- Builds the project with `pnpm run build`
- Deploys to Azure Static Web Apps **Preview** environment
- Handles preview deployments for pull requests

**Required GitHub Secret:**

- **Name**: `AZURE_STATIC_WEB_APPS_API_TOKEN`
- **Value**: `738a2259881cbec5b79e544624dcf6c0f590d1b514486e00ba3febb38e9a3ee401-66ac9885-d6f2-4a49-8dcc-a7d90b493a05003302107724bc03`

**Workflow Features:**

- ✅ **pnpm Support**: Properly configured for pnpm package manager
- ✅ **Caching**: Optimized pnpm store caching for faster builds
- ✅ **Build Paths**: Correctly configured app_location and output_location
- ✅ **Automated**: No manual intervention required
- ✅ **Environment Separation**: Clear separation between preview and production

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

### GitHub Workflows

- **`.github/workflows/azure-static-web-apps.yml`**: Production deployment workflow
- **`.github/workflows/azure-static-web-apps-preview.yml`**: Preview deployment workflow

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
- **Added**: Separate preview and production workflows

### Benefits

- **Simpler**: No container orchestration
- **Faster**: Direct file serving from CDN
- **Cheaper**: Pay-per-use pricing
- **Reliable**: Azure-managed infrastructure
- **Clear**: Separate preview and production environments

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
**Version**: 2.3 (Azure Static Web Apps - Live & Automated with Preview/Production)
**Status**: ✅ Production Deployed with Automated CI/CD
**Last Deployment**: Commit `0796c20` - December 2024
**Current Version**: v0.0.2
