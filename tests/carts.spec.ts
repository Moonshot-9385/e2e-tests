
import { test, expect } from '@playwright/test';

test('add cart', async ({ page }) => {
  await page.goto('/carts');
  await expect(page.getByTestId('sidebar-carts')).toBeVisible();
  await page.getByLabel('Status').selectOption('All statuses');
  await page.getByLabel('Customer').selectOption('Jordan Lee');
  await page.getByRole('button', { name: 'Create cart' }).click();
await page.getByRole('link', { name: /cart_/ }).first().click();
  await expect(page.getByText('Loading cart customer...')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Checkout cart' })).toBeEnabled();
 });



test('abondon cart', async ({ page }) => {
await page.goto('/carts');
  await expect(page.getByTestId('sidebar-carts')).toBeVisible();
  await page.getByLabel('Status').selectOption('All statuses');
  await page.getByLabel('Customer').selectOption('Jordan Lee');
  await page.getByRole('button', { name: 'Create cart' }).click();
  await page.getByRole('link', { name: /cart_/ }).first().click();
  await expect(page.getByText('Loading cart customer...')).toBeVisible();
 await page.getByRole('button', { name: 'Abandon cart' }).click();
await expect(page.getByText('Cart abandoned.')).toBeVisible();

});

