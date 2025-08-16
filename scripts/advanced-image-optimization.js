#!/usr/bin/env node

/**
 * Advanced Image Optimization Script
 * Generates multiple sizes, AVIF format, and responsive images
 */

import { execSync } from 'child_process';
import { existsSync, statSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, basename, extname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Color codes for output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log(`\n${colors.blue}${colors.bold}${title}${colors.reset}`);
  console.log('─'.repeat(title.length));
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Image sizes for responsive design
const RESPONSIVE_SIZES = [
  { width: 400, suffix: 'sm' },
  { width: 800, suffix: 'md' },
  { width: 1200, suffix: 'lg' },
  { width: 1600, suffix: 'xl' },
  { width: 2400, suffix: '2xl' }
];

async function optimizeWithSharp(imagePath, outputPath, options = {}) {
  try {
    const sharp = await import('sharp');
    
    const { width, height, quality = 85, format = 'webp' } = options;
    
    let pipeline = sharp.default(imagePath);
    
    if (width || height) {
      pipeline = pipeline.resize(width, height, {
        fit: 'cover',
        position: 'center'
      });
    }
    
    switch (format) {
      case 'webp':
        pipeline = pipeline.webp({ quality, effort: 6 });
        break;
      case 'avif':
        pipeline = pipeline.avif({ quality, effort: 9 });
        break;
      case 'jpeg':
        pipeline = pipeline.jpeg({ quality, progressive: true });
        break;
      case 'png':
        pipeline = pipeline.png({ quality, progressive: true });
        break;
    }
    
    await pipeline.toFile(outputPath);
    return true;
  } catch (error) {
    logError(`Sharp optimization failed: ${error.message}`);
    return false;
  }
}

async function generateResponsiveImages(imagePath) {
  const fileName = basename(imagePath, extname(imagePath));
  const outputDir = join(dirname(imagePath), 'responsive');
  
  // Create output directory
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }
  
  const results = [];
  
  for (const size of RESPONSIVE_SIZES) {
    // Generate WebP versions
    const webpPath = join(outputDir, `${fileName}-${size.suffix}.webp`);
    const webpSuccess = await optimizeWithSharp(imagePath, webpPath, {
      width: size.width,
      format: 'webp',
      quality: 85
    });
    
    if (webpSuccess) {
      const webpSize = statSync(webpPath).size;
      results.push({
        format: 'webp',
        size: size.suffix,
        width: size.width,
        path: webpPath,
        fileSize: webpSize
      });
    }
    
    // Generate AVIF versions (even better compression)
    const avifPath = join(outputDir, `${fileName}-${size.suffix}.avif`);
    const avifSuccess = await optimizeWithSharp(imagePath, avifPath, {
      width: size.width,
      format: 'avif',
      quality: 80
    });
    
    if (avifSuccess) {
      const avifSize = statSync(avifPath).size;
      results.push({
        format: 'avif',
        size: size.suffix,
        width: size.width,
        path: avifPath,
        fileSize: avifSize
      });
    }
  }
  
  return results;
}

async function optimizeImageAdvanced(imagePath) {
  logInfo(`Processing: ${basename(imagePath)}`);
  
  const originalSize = statSync(imagePath).size;
  const results = [];
  
  // 1. Generate responsive WebP versions
  const responsiveResults = await generateResponsiveImages(imagePath);
  results.push(...responsiveResults);
  
  // 2. Generate optimized original format
  const fileName = basename(imagePath, extname(imagePath));
  const ext = extname(imagePath).toLowerCase();
  const outputDir = join(dirname(imagePath), 'optimized');
  
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }
  
  let format;
  switch (ext) {
    case '.png':
      format = 'png';
      break;
    case '.jpg':
    case '.jpeg':
      format = 'jpeg';
      break;
    default:
      format = 'webp';
  }
  
  const optimizedPath = join(outputDir, `${fileName}-optimized.${format === 'jpeg' ? 'jpg' : format}`);
  const optimizedSuccess = await optimizeWithSharp(imagePath, optimizedPath, {
    format,
    quality: 85
  });
  
  if (optimizedSuccess) {
    const optimizedSize = statSync(optimizedPath).size;
    results.push({
      format: 'optimized',
      size: 'original',
      width: 'original',
      path: optimizedPath,
      fileSize: optimizedSize
    });
  }
  
  // 3. Generate WebP fallback
  const webpPath = join(outputDir, `${fileName}.webp`);
  const webpSuccess = await optimizeWithSharp(imagePath, webpPath, {
    format: 'webp',
    quality: 85
  });
  
  if (webpSuccess) {
    const webpSize = statSync(webpPath).size;
    results.push({
      format: 'webp',
      size: 'fallback',
      width: 'original',
      path: webpPath,
      fileSize: webpSize
    });
  }
  
  // 4. Generate AVIF fallback
  const avifPath = join(outputDir, `${fileName}.avif`);
  const avifSuccess = await optimizeWithSharp(imagePath, avifPath, {
    format: 'avif',
    quality: 80
  });
  
  if (avifSuccess) {
    const avifSize = statSync(avifPath).size;
    results.push({
      format: 'avif',
      size: 'fallback',
      width: 'original',
      path: avifPath,
      fileSize: avifSize
    });
  }
  
  return {
    original: {
      path: imagePath,
      size: originalSize
    },
    optimized: results
  };
}

async function generateImageManifest(optimizedImages) {
  const manifest = {
    images: {},
    totalOriginalSize: 0,
    totalOptimizedSize: 0,
    savings: 0,
    generated: new Date().toISOString()
  };
  
  for (const [imagePath, result] of Object.entries(optimizedImages)) {
    const fileName = basename(imagePath, extname(imagePath));
    const originalSize = result.original.size;
    
    manifest.images[fileName] = {
      original: {
        path: result.original.path,
        size: originalSize,
        sizeFormatted: formatBytes(originalSize)
      },
      variants: result.optimized.map(variant => ({
        format: variant.format,
        size: variant.size,
        width: variant.width,
        path: variant.path,
        fileSize: variant.fileSize,
        fileSizeFormatted: formatBytes(variant.fileSize)
      }))
    };
    
    manifest.totalOriginalSize += originalSize;
    
    // Find the best optimized version for total calculation
    const bestVariant = result.optimized.reduce((best, current) => {
      if (current.format === 'webp' && current.size === 'fallback') {
        return current.fileSize < best.fileSize ? current : best;
      }
      return best;
    }, result.optimized[0]);
    
    manifest.totalOptimizedSize += bestVariant.fileSize;
  }
  
  manifest.savings = manifest.totalOriginalSize - manifest.totalOptimizedSize;
  manifest.savingsPercent = ((manifest.savings / manifest.totalOriginalSize) * 100).toFixed(1);
  
  return manifest;
}

async function main() {
  console.log('🖼️  Dale Rogers Portfolio - Advanced Image Optimization\n');
  
  // Check for Sharp
  const sharpPath = join(projectRoot, 'node_modules/sharp');
  if (!existsSync(sharpPath)) {
    logError('Sharp not found. Install with: pnpm add -D sharp');
    return;
  }
  
  logSection('🔍 Finding Images to Optimize');
  
  const imagesPath = join(projectRoot, 'public/images');
  if (!existsSync(imagesPath)) {
    logWarning('No public/images directory found');
    return;
  }
  
  // Find all image files
  const imageFiles = execSync(
    `find "${imagesPath}" -type f \\( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \\)`,
    { encoding: 'utf8' }
  ).split('\n').filter(Boolean);
  
  if (imageFiles.length === 0) {
    logInfo('No images found to optimize');
    return;
  }
  
  logInfo(`Found ${imageFiles.length} images to process`);
  
  logSection('🚀 Starting Advanced Optimization');
  
  const optimizedImages = {};
  let processedCount = 0;
  
  for (const imagePath of imageFiles) {
    try {
      const result = await optimizeImageAdvanced(imagePath);
      optimizedImages[imagePath] = result;
      processedCount++;
      
      logSuccess(`Processed ${processedCount}/${imageFiles.length}: ${basename(imagePath)}`);
      
      // Show optimization results
      const originalSize = result.original.size;
      const bestOptimized = result.optimized.find(v => v.format === 'webp' && v.size === 'fallback');
      
      if (bestOptimized) {
        const saved = originalSize - bestOptimized.fileSize;
        const savedPercent = ((saved / originalSize) * 100).toFixed(1);
        logInfo(`  Original: ${formatBytes(originalSize)} → Optimized: ${formatBytes(bestOptimized.fileSize)} (${savedPercent}% saved)`);
      }
      
    } catch (error) {
      logError(`Failed to process ${imagePath}: ${error.message}`);
    }
  }
  
  logSection('📊 Generating Image Manifest');
  
  const manifest = await generateImageManifest(optimizedImages);
  
  // Save manifest
  const manifestPath = join(projectRoot, 'public/images/image-manifest.json');
  const fs = await import('fs');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  
  logSection('🎯 Optimization Results Summary');
  
  logSuccess(`Processed: ${processedCount}/${imageFiles.length} images`);
  logInfo(`Total original size: ${formatBytes(manifest.totalOriginalSize)}`);
  logInfo(`Total optimized size: ${formatBytes(manifest.totalOptimizedSize)}`);
  logSuccess(`Total space saved: ${formatBytes(manifest.savings)} (${manifest.savingsPercent}%)`);
  
  logSection('💡 Next Steps');
  
  logInfo('1. Update image references to use responsive variants');
  logInfo('2. Implement <picture> elements with WebP/AVIF fallbacks');
  logInfo('3. Use the image manifest for dynamic loading');
  logInfo('4. Test performance improvements');
  
  logInfo('\n📁 Generated files:');
  logInfo('  • /public/images/responsive/ - Multiple sizes');
  logInfo('  • /public/images/optimized/ - Optimized originals');
  logInfo('  • /public/images/image-manifest.json - Image metadata');
  
  console.log('\n🚀 Advanced image optimization complete!');
}

main().catch(console.error);
