#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { glob } from 'glob';

const projectRoot = process.cwd();

async function fixTailwindReferences() {
  console.log('🔧 Fixing Tailwind CSS @reference directives...');

  try {
    // Find all CSS files
    const cssFiles = await glob('src/**/*.css', { cwd: projectRoot });

    let fixedCount = 0;

    for (const file of cssFiles) {
      const filePath = join(projectRoot, file);

      if (existsSync(filePath)) {
        const content = readFileSync(filePath, 'utf8');

        // Remove @reference "tailwindcss" directives
        if (content.includes('@reference "tailwindcss"')) {
          const fixedContent = content.replace(/@reference "tailwindcss";?\s*/g, '');
          writeFileSync(filePath, fixedContent);
          console.log(`✅ Fixed: ${file}`);
          fixedCount++;
        }
      }
    }

    // Also fix .astro files that might have @reference directives
    const astroFiles = await glob('src/**/*.astro', { cwd: projectRoot });

    for (const file of astroFiles) {
      const filePath = join(projectRoot, file);

      if (existsSync(filePath)) {
        const content = readFileSync(filePath, 'utf8');

        // Remove @reference "tailwindcss" directives from style blocks
        if (content.includes('@reference "tailwindcss"')) {
          const fixedContent = content.replace(/@reference "tailwindcss";?\s*/g, '');
          writeFileSync(filePath, fixedContent);
          console.log(`✅ Fixed: ${file}`);
          fixedCount++;
        }
      }
    }

    console.log(`\n🎉 Fixed ${fixedCount} files!`);
    console.log('📝 All @reference "tailwindcss" directives have been removed.');
    console.log('🚀 Tailwind CSS should now work properly with @apply directives.');
  } catch (error) {
    console.error('❌ Error fixing Tailwind references:', error);
    process.exit(1);
  }
}

fixTailwindReferences();
