
import { test, expect } from '@playwright/test';
test('change currency', async ({ page }) => {
  await page.goto('/settings');
  await expect(page.getByTestId('sidebar-settings')).toBeVisible();
  await page.getByLabel('Currency').selectOption('EUR');
  //await page.getByRole('checkbox', { name: 'Allow out of stock orders' }).check();
     await page.getByRole('button', { name: 'Save settings' }).click();
     await expect(page.getByText('Settings saved.'))




});