#!/usr/bin/env node

/**
 * Crazy Domains Nameserver Checker
 * Compares current nameservers with typical CD nameservers
 */

import { execSync } from 'child_process';

const domain = process.argv[2] || 'dalerogers.com.au';

console.log(`🔍 Checking nameservers for: ${domain}\n`);

// Typical Crazy Domains nameservers
const typicalCDNameservers = [
  'ns1.crazydomains.com',
  'ns2.crazydomains.com',
  'ns3.crazydomains.com',
  'ns4.crazydomains.com',
];

console.log('📋 Current nameservers:');
try {
  const currentNS = execSync(`dig ${domain} NS +short`, { encoding: 'utf8' }).trim();
  if (currentNS) {
    const nameservers = currentNS.split('\n').filter(ns => ns.trim());
    nameservers.forEach((ns, index) => {
      console.log(`   NS${index + 1}: ${ns}`);
    });
  } else {
    console.log('   No nameservers found');
  }
} catch (error) {
  console.log('   Error checking nameservers:', error.message);
}

console.log('\n📋 Typical Crazy Domains nameservers:');
typicalCDNameservers.forEach((ns, index) => {
  console.log(`   CD NS${index + 1}: ${ns}`);
});

console.log('\n🔍 Checking if current nameservers are actually CD:');
try {
  const currentNS = execSync(`dig ${domain} NS +short`, { encoding: 'utf8' }).trim();
  if (currentNS) {
    const nameservers = currentNS.split('\n').filter(ns => ns.trim());

    nameservers.forEach(ns => {
      const cleanNS = ns.replace(/\.$/, ''); // Remove trailing dot
      if (typicalCDNameservers.includes(cleanNS)) {
        console.log(`   ✅ ${cleanNS} - This IS a Crazy Domains nameserver`);
      } else {
        console.log(`   ❌ ${cleanNS} - This is NOT a typical Crazy Domains nameserver`);

        // Check what this nameserver actually is
        try {
          const whoisResult = execSync(`whois ${cleanNS}`, { encoding: 'utf8' }).trim();
          if (whoisResult.includes('crazy') || whoisResult.includes('Crazy')) {
            console.log(`      ℹ️  But appears to be related to Crazy Domains`);
          } else {
            console.log(`      ℹ️  Appears to be from: ${cleanNS.split('.').slice(-2).join('.')}`);
          }
        } catch {
          console.log(`      ℹ️  Could not determine provider for ${cleanNS}`);
        }
      }
    });
  }
} catch (error) {
  console.log('   Error analyzing nameservers:', error.message);
}

console.log('\n📝 Analysis:');
console.log(
  '1. If nameservers contain "crazydomains.com" → Update DNS records in CD control panel'
);
console.log('2. If nameservers are different → You may need to change nameservers to CD ones');
console.log('3. The "syrahost.com" nameservers suggest a different DNS provider setup');
console.log('');
console.log('🔧 Next steps:');
console.log('1. Log into Crazy Domains control panel');
console.log('2. Check what nameservers they recommend for your domain');
console.log("3. Compare with what's currently configured");
console.log('4. Either update DNS records OR change nameservers as needed');
