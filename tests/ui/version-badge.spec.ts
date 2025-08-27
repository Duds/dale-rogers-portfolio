import { test, expect } from '@playwright/test';

test.describe('VersionBadge Component', () => {
  test('renders version badge with version number and environment', async ({ page }) => {
    // Navigate to any page to see the footer
    await page.goto('/');
    
    // Find the version badge in the footer
    const versionBadge = page.locator('.version-badge');
    await expect(versionBadge).toBeVisible();
    
    // Check that version number is displayed
    const versionText = page.locator('.version-badge__version');
    await expect(versionText).toBeVisible();
    await expect(versionText).toContainText('v0.0.2');
    
    // Check that environment is displayed
    const environmentText = page.locator('.version-badge__environment');
    await expect(environmentText).toBeVisible();
    
    // Environment should be one of: dev, preview, or prod
    const environment = await environmentText.textContent();
    expect(['dev', 'preview', 'prod']).toContain(environment);
  });

  test('version badge has proper styling classes', async ({ page }) => {
    await page.goto('/');
    
    const versionBadge = page.locator('.version-badge');
    
    // Should have one of the environment-specific classes
    const classList = await versionBadge.getAttribute('class');
    expect(classList).toMatch(/(env-dev|env-preview|env-prod)/);
    
    // Should have base version-badge class
    expect(classList).toContain('version-badge');
  });

  test('version badge shows tooltip with build info', async ({ page }) => {
    await page.goto('/');
    
    const versionBadge = page.locator('.version-badge');
    
    // Check that tooltip attribute exists
    const title = await versionBadge.getAttribute('title');
    expect(title).toBeTruthy();
    
    // Tooltip should contain branch and commit info
    expect(title).toContain('Branch:');
    expect(title).toContain('Commit:');
  });
});
