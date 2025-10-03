#!/usr/bin/env node

/**
 * Nameserver Checker for Domain Configuration
 * Helps determine if nameserver changes are needed
 */

import { execSync } from 'child_process';

const domain = process.argv[2] || 'dalerogers.com.au';

console.log(`🔍 Checking nameservers for: ${domain}\n`);

// Check nameservers from different sources
const dnsServers = [
  '8.8.8.8', // Google
  '1.1.1.1', // Cloudflare
  '208.67.222.222', // OpenDNS
];

console.log('📋 Nameserver information:');

for (const server of dnsServers) {
  try {
    console.log(
      `\n🌐 From ${server} (${server === '8.8.8.8' ? 'Google' : server === '1.1.1.1' ? 'Cloudflare' : 'OpenDNS'}):`
    );

    // Get nameservers
    const nsResult = execSync(`dig @${server} ${domain} NS +short`, { encoding: 'utf8' }).trim();
    if (nsResult) {
      const nameservers = nsResult.split('\n').filter(ns => ns.trim());
      nameservers.forEach((ns, index) => {
        console.log(`   NS${index + 1}: ${ns}`);
      });
    } else {
      console.log('   No nameservers found');
    }

    // Get SOA record (shows primary nameserver)
    try {
      const soaResult = execSync(`dig @${server} ${domain} SOA +short`, {
        encoding: 'utf8',
      }).trim();
      if (soaResult) {
        const soaParts = soaResult.split(' ');
        console.log(`   Primary NS: ${soaParts[0]}`);
      }
    } catch {
      console.log('   SOA record not available');
    }
  } catch (error) {
    console.log(`   Error checking from ${server}: ${error.message}`);
  }
}

console.log('\n📝 Analysis:');
console.log('✅ If nameservers show Crazy Domains servers (like ns1.crazydomains.com),');
console.log('   you do NOT need to change nameservers.');
console.log('');
console.log('✅ You only need to update DNS records (A → CNAME) in Crazy Domains.');
console.log('');
console.log("❌ Only change nameservers if you're moving your domain to a different");
console.log('   registrar or DNS provider entirely.');
console.log('');
console.log('🔧 Next step: Update DNS records in Crazy Domains control panel');
console.log('   - Remove A record pointing to 27.54.88.129');
console.log('   - Add CNAME record pointing to wonderful-pond-07724bc03.1.azurestaticapps.net');
