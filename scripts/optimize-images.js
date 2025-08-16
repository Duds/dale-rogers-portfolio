#!/usr/bin/env node

/**
 * Image Optimization Script
 * Compresses large images and converts them to modern web formats
 */

import { execSync } from 'child_process';
import { existsSync, statSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

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

function checkImageOptimizationTools() {
  logSection('🔧 Checking Image Optimization Tools');
  
  try {
    // Check for ImageMagick
    try {
      const magickVersion = execSync('magick --version', { encoding: 'utf8', stdio: 'pipe' });
      logSuccess('ImageMagick available');
      logInfo(`Version: ${magickVersion.split('\n')[0]}`);
      return 'imagemagick';
    } catch (e) {
      logWarning('ImageMagick not found');
    }
    
    // Check for Sharp (Node.js)
    try {
      const sharpPath = join(projectRoot, 'node_modules/sharp');
      if (existsSync(sharpPath)) {
        logSuccess('Sharp (Node.js) available');
        return 'sharp';
      }
    } catch (e) {
      logWarning('Sharp not found');
    }
    
    // Check for pngquant
    try {
      const pngquantVersion = execSync('pngquant --version', { encoding: 'utf8', stdio: 'pipe' });
      logSuccess('pngquant available');
      logInfo(`Version: ${pngquantVersion.split('\n')[0]}`);
      return 'pngquant';
    } catch (e) {
      logWarning('pngquant not found');
    }
    
    logError('No image optimization tools found');
    logInfo('Install one of: ImageMagick, Sharp, or pngquant');
    return null;
    
  } catch (error) {
    logError(`Failed to check tools: ${error.message}`);
    return null;
  }
}

function analyzeImageSizes() {
  logSection('📊 Image Size Analysis');
  
  try {
    const imagesPath = join(projectRoot, 'public/images');
    if (!existsSync(imagesPath)) {
      logWarning('No public/images directory found');
      return [];
    }
    
    const largeImages = [];
    
    // Find all image files
    const imageFiles = execSync(`find "${imagesPath}" -type f \\( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.webp" \\)`, { 
      encoding: 'utf8' 
    }).split('\n').filter(Boolean);
    
    logInfo(`Found ${imageFiles.length} image files`);
    
    for (const file of imageFiles) {
      try {
        const stats = statSync(file);
        const sizeMB = stats.size / (1024 * 1024);
        
        if (sizeMB > 1) { // Larger than 1MB
          largeImages.push({
            path: file,
            size: stats.size,
            sizeMB: sizeMB
          });
        }
              } catch {
          // Skip files we can't access
        }
    }
    
    if (largeImages.length > 0) {
      logWarning(`${largeImages.length} large images found (>1MB):`);
      largeImages
        .sort((a, b) => b.sizeMB - a.sizeMB)
        .forEach(img => {
          const relativePath = img.path.replace(projectRoot + '/', '');
          logInfo(`  ${relativePath}: ${formatBytes(img.size)}`);
        });
    } else {
      logSuccess('No large images found');
    }
    
    return largeImages;
    
  } catch (error) {
    logError(`Failed to analyze images: ${error.message}`);
    return [];
  }
}

function optimizeWithImageMagick(imagePath, outputPath) {
  try {
    // Convert to WebP with quality optimization
    execSync(`magick "${imagePath}" -quality 85 -define webp:lossless=false "${outputPath}"`, { 
      stdio: 'pipe' 
    });
    return true;
  } catch (error) {
    logError(`ImageMagick optimization failed: ${error.message}`);
    return false;
  }
}

function optimizeWithPngquant(imagePath, outputPath) {
  try {
    // PNG optimization with quality settings
    execSync(`pngquant --quality=65-80 --force --output "${outputPath}" "${imagePath}"`, { 
      stdio: 'pipe' 
    });
    return true;
  } catch (error) {
    logError(`pngquant optimization failed: ${error.message}`);
    return false;
  }
}

async function optimizeWithSharp(imagePath, outputPath) {
  try {
    // Dynamic import for Sharp
    const sharp = await import('sharp');
    
    // Convert to WebP with quality optimization
    await sharp.default(imagePath)
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath);
    
    return true;
  } catch (error) {
    logError(`Sharp optimization failed: ${error.message}`);
    return false;
  }
}

async function optimizeImages(largeImages, tool) {
  logSection('🔄 Image Optimization');
  
  if (largeImages.length === 0) {
    logInfo('No images to optimize');
    return;
  }
  
  logInfo(`Optimizing ${largeImages.length} images using ${tool}...`);
  
  let successCount = 0;
  let totalSaved = 0;
  
  for (const image of largeImages) {
    try {
      const relativePath = image.path.replace(projectRoot + '/', '');
      logInfo(`Optimizing: ${relativePath}`);
      
      const originalSize = image.size;
      const outputPath = image.path.replace(/\.(png|jpg|jpeg)$/i, '.webp');
      
      let success = false;
      
      if (tool === 'imagemagick') {
        success = optimizeWithImageMagick(image.path, outputPath);
      } else if (tool === 'pngquant' && image.path.toLowerCase().endsWith('.png')) {
        success = optimizeWithPngquant(image.path, outputPath);
      } else if (tool === 'sharp') {
        success = await optimizeWithSharp(image.path, outputPath);
      }
      
      if (success && existsSync(outputPath)) {
        const optimizedSize = statSync(outputPath).size;
        const saved = originalSize - optimizedSize;
        const savedPercent = ((saved / originalSize) * 100).toFixed(1);
        
        logSuccess(`  Original: ${formatBytes(originalSize)}`);
        logSuccess(`  Optimized: ${formatBytes(optimizedSize)}`);
        logSuccess(`  Saved: ${formatBytes(saved)} (${savedPercent}%)`);
        
        totalSaved += saved;
        successCount++;
        
        // Create backup of original
        const backupPath = image.path + '.backup';
        execSync(`cp "${image.path}" "${backupPath}"`, { stdio: 'pipe' });
        logInfo(`  Backup created: ${backupPath}`);
        
      } else {
        logWarning(`  Optimization failed`);
      }
      
    } catch (error) {
      logError(`  Failed to optimize ${image.path}: ${error.message}`);
    }
  }
  
  logSection('📊 Optimization Results');
  logSuccess(`Successfully optimized: ${successCount}/${largeImages.length} images`);
  logSuccess(`Total space saved: ${formatBytes(totalSaved)}`);
  
  if (successCount > 0) {
    logInfo('\n💡 Next steps:');
    logInfo('1. Test the optimized images in your application');
    logInfo('2. If satisfied, remove the .backup files');
    logInfo('3. Update image references to use .webp format');
    logInfo('4. Run build again to see bundle size improvement');
  }
}

function generateOptimizationRecommendations() {
  logSection('💡 Image Optimization Recommendations');
  
  logInfo('🎯 Immediate Actions:');
  logInfo('  • Convert large PNGs to WebP format (85% quality)');
  logInfo('  • Use responsive images with srcset');
  logInfo('  • Implement lazy loading for images');
  
  logInfo('\n📱 Responsive Images:');
  logInfo('  • Generate multiple sizes: 400w, 800w, 1200w');
  logInfo('  • Use <picture> element with WebP fallback');
  logInfo('  • Implement art direction for different viewports');
  
  logInfo('\n🚀 Performance:');
  logInfo('  • Target < 200KB per image for web');
  logInfo('  • Use WebP for modern browsers');
  logInfo('  • Consider AVIF for even better compression');
  
  logInfo('\n🔧 Tools:');
  logInfo('  • ImageMagick: magick convert -quality 85 input.png output.webp');
  logInfo('  • Sharp (Node.js): High-performance image processing');
  logInfo('  • pngquant: PNG-specific optimization');
}

async function main() {
  console.log('🖼️  Dale Rogers Portfolio - Image Optimization\n');
  
  const tool = checkImageOptimizationTools();
  if (!tool) {
    logError('Cannot proceed without optimization tools');
    return;
  }
  
  const largeImages = analyzeImageSizes();
  
  if (largeImages.length > 0) {
    const shouldOptimize = process.argv.includes('--auto') || 
                          process.argv.includes('--yes') ||
                          process.argv.includes('-y');
    
    if (shouldOptimize) {
      optimizeImages(largeImages, tool);
    } else {
      logInfo('\n💡 To automatically optimize images, run:');
      logInfo(`  node scripts/optimize-images.js --auto`);
      logInfo('  or');
      logInfo(`  node scripts/optimize-images.js --yes`);
    }
  }
  
  generateOptimizationRecommendations();
  
  logSection('📋 Image Optimization Complete');
  logInfo('Review the analysis above and implement recommended optimizations.');
  logInfo('Large images are the main cause of your 26.98MB bundle size.');
  
  console.log('\n🚀 Ready for image optimization!');
}

main();
