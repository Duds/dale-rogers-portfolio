#!/usr/bin/env node

/**
 * DNS Status Checker for Azure Static Web App Domain Validation
 * Helps troubleshoot domain validation issues by checking DNS propagation
 */

import { execSync } from 'child_process';
import dns from 'dns';
import { promisify } from 'util';

const resolveCname = promisify(dns.resolveCname);
const resolve4 = promisify(dns.resolve4);

const AZURE_URL = 'wonderful-pond-07724bc03.1.azurestaticapps.net';

async function checkDomain(domain) {
  console.log(`🔍 Checking DNS status for: ${domain}`);
  console.log(`📍 Expected Azure URL: ${AZURE_URL}\n`);

  try {
    // Check CNAME record
    console.log('📋 Checking CNAME record...');
    const cnameRecords = await resolveCname(domain);

    if (cnameRecords.length > 0) {
      console.log(`✅ CNAME found: ${cnameRecords[0]}`);

      if (cnameRecords[0] === AZURE_URL) {
        console.log('✅ CNAME matches Azure URL perfectly!');
      } else {
        console.log('❌ CNAME does NOT match Azure URL');
        console.log(`   Expected: ${AZURE_URL}`);
        console.log(`   Found: ${cnameRecords[0]}`);
      }
    } else {
      console.log('❌ No CNAME record found');
    }
  } catch (error) {
    console.log('❌ CNAME lookup failed:', error.message);
  }

  try {
    // Check A record (in case it's configured)
    console.log('\n📋 Checking A record...');
    const aRecords = await resolve4(domain);

    if (aRecords.length > 0) {
      console.log(`✅ A record found: ${aRecords[0]}`);
      console.log('⚠️  Note: A records should point to Azure IP, not CNAME');
    } else {
      console.log('ℹ️  No A record found (this is fine for CNAME setup)');
    }
  } catch {
    console.log('ℹ️  A record lookup failed (this is normal for CNAME setup)');
  }

  // Check from different DNS servers
  console.log('\n🌐 Checking from different DNS servers...');

  const dnsServers = [
    '8.8.8.8', // Google
    '1.1.1.1', // Cloudflare
    '208.67.222.222', // OpenDNS
  ];

  for (const server of dnsServers) {
    try {
      const result = execSync(`dig @${server} ${domain} CNAME +short`, { encoding: 'utf8' }).trim();
      if (result) {
        console.log(`   ${server}: ${result}`);
      } else {
        console.log(`   ${server}: No CNAME found`);
      }
    } catch {
      console.log(`   ${server}: Error checking`);
    }
  }
}

async function main() {
  const domain = process.argv[2];

  if (!domain) {
    console.log('Usage: node check-dns-status.js <yourdomain.com>');
    console.log('Example: node check-dns-status.js example.com');
    process.exit(1);
  }

  await checkDomain(domain);

  console.log('\n📝 Troubleshooting Tips:');
  console.log('1. If CNAME is correct, wait 15-30 minutes and retry validation');
  console.log('2. If CNAME is wrong, update your DNS records in Crazy Domains');
  console.log("3. Ensure you're using CNAME, not A record for the root domain");
  console.log('4. Check for any trailing dots or typos in the CNAME value');
  console.log('5. Try validation again in Azure portal after DNS propagation');
}

main().catch(console.error);
