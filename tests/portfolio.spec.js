import { test, expect } from '@playwright/test';

test('choice screen stays idle until selection', async ({ page }) => {
  await page.goto('/#/home');
  await expect(page.locator('#introGate')).toHaveAttribute('aria-hidden', 'false');
  await expect(page.locator('#introGate')).toHaveAttribute('data-booting', 'false');
  await expect(page.getByRole('button', { name: 'Product Manager' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Educator' })).toBeVisible();

  await page.keyboard.press('Control+k');
  await expect(page.locator('#shell')).toHaveAttribute('data-activities', 'closed');

  await page.getByRole('button', { name: 'Educator' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-interface', 'greenboard');
  await expect(page.locator('#introGate')).toHaveAttribute('aria-hidden', 'true');
  await expect(page.locator('#introGate')).toHaveAttribute('data-booting', 'false');
});

test('Product Manager boots with the selected ASCII mark', async ({ page }) => {
  const counterRequests = [];
  page.on('request', request => {
    if (/countapi|site-visits/i.test(request.url())) counterRequests.push(request.url());
  });
  await page.goto('/#/home');
  await page.locator('[data-intro-interface="distro"]').click();
  await expect(page.locator('#introGate')).toHaveAttribute('aria-hidden', 'true', { timeout: 8_000 });
  await expect(page.locator('html')).toHaveAttribute('data-interface', 'distro');
  await expect(page.locator('#introBootMark')).toContainText('.:+aaaaaaaaaa+:.');
  await expect(page.locator('.ark-fetch-ascii')).toContainText('.:+aaaaaaaaaa+:.');
  await expect(page.locator('#arkVisitNumber')).toHaveCount(0);
  expect(counterRequests).toEqual([]);
});

test('Educator project links work by keyboard', async ({ page }) => {
  await page.goto('/#/projects');
  await page.evaluate(() => setInterface('greenboard'));
  const firstProject = page.locator('.file-project-link').first();
  await expect(firstProject).toBeVisible();
  await firstProject.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#\/projects\/\d+$/);
});

test('reset restores Distro navigation', async ({ page }) => {
  await page.goto('/#/settings');
  await page.evaluate(() => setInterface('greenboard'));
  await expect(page.locator('html')).toHaveAttribute('data-interface', 'greenboard');
  await page.evaluate(() => runCommand('reset'));
  await expect(page.locator('html')).toHaveAttribute('data-interface', 'distro');
  await expect(page.locator('#navigator')).toHaveAttribute('data-workbench', 'true');
});

test('browser history restores the selected route', async ({ page }) => {
  await page.goto('/#/projects');
  await page.locator('.ide-project-row').first().click();
  await expect(page).toHaveURL(/#\/projects\/\d+$/);
  await page.goBack();
  await expect(page).toHaveURL(/#\/projects$/);
  await expect(page.locator('.ide-list-view')).toBeVisible();
});

test('320px mobile navigation and layout stay usable', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto('/#/home');
  await page.locator('[data-intro-interface="distro"]').click();
  await expect(page.locator('#introGate')).toHaveAttribute('aria-hidden', 'true', { timeout: 8_000 });
  const widths = await page.evaluate(() => ({
    document: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    viewport: document.querySelector('#viewport').scrollWidth - document.querySelector('#viewport').clientWidth
  }));
  expect(widths.document).toBeLessThanOrEqual(2);
  expect(widths.viewport).toBeLessThanOrEqual(2);
  await page.locator('#mobileExploreNavBtn').click();
  await expect(page.locator('#shell')).toHaveAttribute('data-activities', 'open');
});
