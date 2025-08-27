#!/usr/bin/env node

/**
 * Script to scrape article and case study dates from dalerogers.com.au
 * Updates local .mdx files with correct publication dates
 */

import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base URLs to try (HTTP and HTTPS)
const BASE_URLS = ['http://dalerogers.com.au', 'https://dalerogers.com.au'];

// Content directories
const ARTICLES_DIR = path.join(__dirname, '../src/content/articles');
const CASE_STUDIES_DIR = path.join(__dirname, '../src/content/case-studies');

// Mapping of local filenames to live URLs and RSS data
const CONTENT_MAPPING = {
  // Case Studies - these are accessible via /work/[slug]
  'making-travel-simple.mdx': {
    url: '/work/making-travel-simple',
    rssDate: 'Tue, 12 Mar 2024 17:06:58 +0000',
  },
  'a-better-fit-and-proper-person-test.mdx': {
    url: '/work/a-better-fit-and-proper-person-test',
    rssDate: 'Tue, 12 Mar 2024 17:06:58 +0000',
  },
  'designing-a-quality-solution-to-an-airbag-problem.mdx': {
    url: '/work/designing-a-quality-solution-to-an-airbag-problem-using-poka',
    rssDate: 'Tue, 12 Mar 2024 17:06:58 +0000',
  },
  'improving-digital-agility-in-higher-education.mdx': {
    url: '/work/improving-digital-agility-in-higher-education',
    rssDate: 'Tue, 12 Mar 2024 17:06:58 +0000',
  },

  // Articles - these may not be published on the live site yet
  // We'll use the RSS feed dates if available, otherwise try to scrape
  'considerations-for-trauma-informed-design.mdx': {
    url: '/articles/considerations-for-trauma-informed-design',
    rssDate: null,
  },
  'designing-intentional-culture.mdx': {
    url: '/articles/designing-intentional-culture',
    rssDate: null,
  },
  'embracing-gemba-in-service-design-for-effective-problem-solving.mdx': {
    url: '/articles/embracing-gemba-in-service-design-for-effective-problem-solving',
    rssDate: null,
  },
  'five-elements-of-service-design-for-government.mdx': {
    url: '/articles/five-elements-of-service-design-for-government',
    rssDate: null,
  },
  'how-the-design-thinking-process-works-in-government.mdx': {
    url: '/articles/how-the-design-thinking-process-works-in-government',
    rssDate: null,
  },
  'how-to-embed-continuous-improvement.mdx': {
    url: '/articles/how-to-embed-continuous-improvement',
    rssDate: null,
  },
  'poka-yoke-in-service-design-and-user-experience.mdx': {
    url: '/articles/poka-yoke-in-service-design-and-user-experience',
    rssDate: null,
  },
  'service-blueprinting.md': {
    url: '/articles/service-blueprinting',
    rssDate: null,
  },
  'service-design-in-the-era-of-remote-work.mdx': {
    url: '/articles/service-design-in-the-era-of-remote-work',
    rssDate: null,
  },
  'service-design-principles.md': {
    url: '/articles/service-design-principles',
    rssDate: null,
  },
  'the-ethics-of-service-design.mdx': {
    url: '/articles/the-ethics-of-service-design',
    rssDate: null,
  },
  'using-ms-teams-for-better-organisational-security.mdx': {
    url: '/articles/using-ms-teams-for-better-organisational-security',
    rssDate: null,
  },
  'what-is-service-design.mdx': {
    url: '/articles/what-is-service-design',
    rssDate: null,
  },
  'will-ai-mean-the-end-of-consulting.mdx': {
    url: '/articles/will-ai-mean-the-end-of-consulting',
    rssDate: null,
  },

  // Additional case studies that might be in RSS
  'developing-a-robust-doctrine-application-for-the-antarctic.mdx': {
    url: '/work/developing-a-robust-doctrine-application-for-the-antarctic',
    rssDate: null,
  },
  'protecting-our-borders-with-digital-verification.mdx': {
    url: '/work/protecting-our-borders-with-digital-verification',
    rssDate: null,
  },
  'developing-a-bespoke-pmo-as-a-service-for-rio-tinto-aluminium.mdx': {
    url: '/work/developing-a-bespoke-pmo-as-a-service-for-rio-tinto-aluminium',
    rssDate: null,
  },
};

/**
 * Parse RSS date format to YYYY-MM-DD
 */
function parseRSSDate(rssDateString) {
  if (!rssDateString) return null;

  try {
    const date = new Date(rssDateString);
    if (isNaN(date.getTime())) return null;

    return date.toISOString().split('T')[0]; // YYYY-MM-DD format
  } catch {
    console.log(`⚠️  Could not parse RSS date: ${rssDateString}`);
    return null;
  }
}

/**
 * Extract date from HTML content
 * Looks for common date patterns in the page
 */
function extractDateFromHTML(html) {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  // Try multiple selectors for date extraction
  const dateSelectors = [
    'time[datetime]',
    '.pubDate',
    '.date',
    '.published',
    '[data-pubdate]',
    'meta[property="article:published_time"]',
    'meta[name="pubdate"]',
  ];

  for (const selector of dateSelectors) {
    const element = document.querySelector(selector);
    if (element) {
      if (element.hasAttribute('datetime')) {
        return element.getAttribute('datetime');
      } else if (element.hasAttribute('content')) {
        return element.getAttribute('content');
      } else if (element.textContent) {
        return element.textContent.trim();
      }
    }
  }

  // Look for date patterns in text content
  const textContent = document.body.textContent;
  const datePatterns = [
    /(\d{1,2}\/\d{1,2}\/\d{4})/g, // DD/MM/YYYY
    /(\d{4}-\d{2}-\d{2})/g, // YYYY-MM-DD
    /(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4})/gi, // DD Month YYYY
    /(?:published|posted|updated)\s+(?:on\s+)?(\d{1,2}\/\d{1,2}\/\d{4})/gi,
    /(?:published|posted|updated)\s+(?:on\s+)?(\d{4}-\d{2}-\d{2})/gi,
  ];

  for (const pattern of datePatterns) {
    const match = textContent.match(pattern);
    if (match) {
      return match[1] || match[0];
    }
  }

  return null;
}

/**
 * Normalize date format to YYYY-MM-DD
 */
function normalizeDate(dateString) {
  if (!dateString) return null;

  // If already in YYYY-MM-DD format
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString;
  }

  // Handle DD/MM/YYYY format
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  // Handle DD Month YYYY format
  const monthMap = {
    jan: '01',
    feb: '02',
    mar: '03',
    apr: '04',
    may: '05',
    jun: '06',
    jul: '07',
    aug: '08',
    sep: '09',
    oct: '10',
    nov: '11',
    dec: '12',
  };

  const monthMatch = dateString.match(
    /(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+(\d{4})/i
  );
  if (monthMatch) {
    const [, day, month, year] = monthMatch;
    const monthNum = monthMap[month.toLowerCase()];
    if (monthNum) {
      return `${year}-${monthNum}-${day.padStart(2, '0')}`;
    }
  }

  return null;
}

/**
 * Update the pubDate in an .mdx file
 */
async function updateFileDate(filePath, newDate) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');

    // Check if file already has a pubDate
    if (content.includes('pubDate:')) {
      // Update existing pubDate
      const updatedContent = content.replace(/pubDate:\s*\d{4}-\d{2}-\d{2}/, `pubDate: ${newDate}`);

      if (updatedContent !== content) {
        await fs.writeFile(filePath, updatedContent, 'utf-8');
        console.log(`✅ Updated ${path.basename(filePath)}: ${newDate}`);
        return true;
      } else {
        console.log(`ℹ️  No change needed for ${path.basename(filePath)}`);
        return false;
      }
    } else {
      // Add pubDate if it doesn't exist
      const updatedContent = content.replace(/^---\n/, `---\npubDate: ${newDate}\n`);

      if (updatedContent !== content) {
        await fs.writeFile(filePath, updatedContent, 'utf-8');
        console.log(`✅ Added pubDate to ${path.basename(filePath)}: ${newDate}`);
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Scrape a single URL and extract the date
 */
async function scrapeDate(urlPath) {
  for (const baseUrl of BASE_URLS) {
    try {
      const fullUrl = baseUrl + urlPath;
      console.log(`🔍 Scraping: ${fullUrl}`);

      const response = await fetch(fullUrl, {
        // Ignore SSL certificate issues
        agent: baseUrl.startsWith('https')
          ? new https.Agent({ rejectUnauthorized: false })
          : undefined,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const html = await response.text();
      const rawDate = extractDateFromHTML(html);

      if (!rawDate) {
        console.log(`⚠️  No date found for ${fullUrl}`);
        continue;
      }

      const normalizedDate = normalizeDate(rawDate);
      if (!normalizedDate) {
        console.log(`⚠️  Could not normalize date "${rawDate}" for ${fullUrl}`);
        continue;
      }

      console.log(`📅 Found date: ${rawDate} → ${normalizedDate}`);
      return normalizedDate;
    } catch (error) {
      console.log(`⚠️  Failed with ${baseUrl}: ${error.message}`);
      continue;
    }
  }

  console.log(`❌ Failed to scrape date for ${urlPath} with all base URLs`);
  return null;
}

/**
 * Main function to scrape all content
 */
async function main() {
  console.log('🚀 Starting date scraping for articles and case studies...\n');

  let totalUpdated = 0;
  let totalErrors = 0;

  for (const [filename, contentInfo] of Object.entries(CONTENT_MAPPING)) {
    let date = null;

    // First try to use RSS date if available
    if (contentInfo.rssDate) {
      date = parseRSSDate(contentInfo.rssDate);
      if (date) {
        console.log(`📅 Using RSS date for ${filename}: ${date}`);
      }
    }

    // If no RSS date, try to scrape from the live site
    if (!date) {
      date = await scrapeDate(contentInfo.url);
    }

    if (date) {
      // Determine which directory the file is in
      let filePath;
      if (filename.endsWith('.mdx') && filename.includes('case-study')) {
        filePath = path.join(CASE_STUDIES_DIR, filename);
      } else if (
        filename.endsWith('.mdx') &&
        filename.includes('designing-a-quality-solution-to-an-airbag-problem')
      ) {
        filePath = path.join(CASE_STUDIES_DIR, filename);
      } else if (
        filename.endsWith('.mdx') &&
        filename.includes('improving-digital-agility-in-higher-education')
      ) {
        filePath = path.join(CASE_STUDIES_DIR, filename);
      } else if (filename.endsWith('.mdx') && filename.includes('making-travel-simple')) {
        filePath = path.join(CASE_STUDIES_DIR, filename);
      } else if (
        filename.endsWith('.mdx') &&
        filename.includes('a-better-fit-and-proper-person-test')
      ) {
        filePath = path.join(CASE_STUDIES_DIR, filename);
      } else if (
        filename.endsWith('.mdx') &&
        filename.includes('developing-a-robust-doctrine-application-for-the-antarctic')
      ) {
        filePath = path.join(CASE_STUDIES_DIR, filename);
      } else if (
        filename.endsWith('.mdx') &&
        filename.includes('protecting-our-borders-with-digital-verification')
      ) {
        filePath = path.join(CASE_STUDIES_DIR, filename);
      } else if (
        filename.endsWith('.mdx') &&
        filename.includes('developing-a-bespoke-pmo-as-a-service-for-rio-tinto-aluminium')
      ) {
        filePath = path.join(CASE_STUDIES_DIR, filename);
      } else if (filename.endsWith('.mdx')) {
        filePath = path.join(ARTICLES_DIR, filename);
      } else {
        filePath = path.join(ARTICLES_DIR, filename);
      }

      try {
        const updated = await updateFileDate(filePath, date);
        if (updated) totalUpdated++;
      } catch (error) {
        console.error(`❌ Error updating file ${filename}:`, error.message);
        totalErrors++;
      }
    } else {
      totalErrors++;
    }

    // Add a small delay to be respectful to the server
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n📊 Scraping Summary:');
  console.log(`✅ Files updated: ${totalUpdated}`);
  console.log(`❌ Errors: ${totalErrors}`);
  console.log(`📁 Total processed: ${Object.keys(CONTENT_MAPPING).length}`);

  if (totalErrors === 0) {
    console.log('\n🎉 All dates scraped and updated successfully!');
  } else {
    console.log('\n⚠️  Some files had issues. Check the logs above.');
  }
}

// Run the script
main().catch(console.error);
