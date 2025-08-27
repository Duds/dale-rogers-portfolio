#!/usr/bin/env node

/**
 * Version Sync Script
 * Automatically syncs version from package.json to all component files
 * Run this after semantic-release updates the version
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get version from package.json
function getPackageVersion() {
  const packagePath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  return packageJson.version;
}

// Update version in a file
function updateVersionInFile(filePath, oldVersion, newVersion) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Update version strings
    content = content.replace(
      new RegExp(`['"]${oldVersion}['"]`, 'g'),
      `'${newVersion}'`
    );
    
    // Update version constants
    content = content.replace(
      new RegExp(`version = ['"]${oldVersion}['"]`, 'g'),
      `version = '${newVersion}'`
    );
    
    // Update version variables
    content = content.replace(
      new RegExp(`version: ['"]${oldVersion}['"]`, 'g'),
      `version: '${newVersion}'`
    );
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
    return false;
  }
}

// Main function
function syncVersion() {
  const newVersion = getPackageVersion();
  console.log(`🔄 Syncing version ${newVersion} across files...`);
  
  // Files that need version updates
  const filesToUpdate = [
    'src/layouts/BaseLayout.astro',
    'src/components/ui/VersionBadge.astro'
  ];
  
  let updatedCount = 0;
  
  filesToUpdate.forEach(filePath => {
    const fullPath = path.join(__dirname, '..', filePath);
    if (fs.existsSync(fullPath)) {
      // Read current content to find old version
      const content = fs.readFileSync(fullPath, 'utf8');
      const versionMatch = content.match(/version\s*=\s*['"]([^'"]+)['"]/);
      
      if (versionMatch) {
        const oldVersion = versionMatch[1];
        if (oldVersion !== newVersion) {
          if (updateVersionInFile(fullPath, oldVersion, newVersion)) {
            updatedCount++;
          }
        } else {
          console.log(`ℹ️  ${filePath} already has version ${newVersion}`);
        }
      } else {
        console.log(`⚠️  No version found in ${filePath}`);
      }
    } else {
      console.log(`⚠️  File not found: ${filePath}`);
    }
  });
  
  console.log(`\n🎉 Version sync complete! Updated ${updatedCount} files.`);
  console.log(`📦 Current version: ${newVersion}`);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  syncVersion();
}

export { syncVersion };
