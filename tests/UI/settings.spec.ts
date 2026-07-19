
import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test('change currency', async ({ page }) => {
  await page.goto('/settings');
  await expect(page.getByTestId('sidebar-settings')).toBeVisible();
  await page.getByLabel('Currency').selectOption('USD');
   await page.getByRole('button', { name: 'Save settings' }).click();
  //await expect(page.getByText('Settings saved.')).toBeVisible();
});