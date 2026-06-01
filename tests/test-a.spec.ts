
import { test, expect } from '@playwright/test';
test.describe('test a', () => {
  // Plus besoin de taper les identifiants, Playwright injecte la session automatiquement !
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
  });

test('test check', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Open Menu' })).toBeEnabled();
    const sortDropdown = page.getByRole('combobox');
    await expect(sortDropdown).toBeVisible();
    await sortDropdown.selectOption({ label: 'Price (low to high)' });
    await sortDropdown.selectOption({ label: 'Price (high to low)' });
    await sortDropdown.selectOption({ label: 'Name (A to Z)' });
    await sortDropdown.selectOption({ label: 'Name (Z to A)' });

  });

test('test demo', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'LinkedIn' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Facebook' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Twitter' })).toBeVisible();
   
  });
  });
