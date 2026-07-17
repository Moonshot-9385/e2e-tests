import { test, expect } from '@playwright/test';
import { createOrderUI } from '../../hooks/create-order-ui';

test.beforeEach(async ({ page }) => {
  await createOrderUI(page);
});

test('modifier order', async ({ page }) => {
  await page.getByRole('button', { name: 'Remove' }).click();
    await page.getByLabel('Product').selectOption('Mechanical Keyboard');
    await page.getByRole('button', { name: 'Add item' }).click();
  await page.getByRole('button', { name: 'Checkout cart' }).click();
  await expect(page.getByRole('row', { name: 'Mechanical Keyboard 1 €150.00 €150.00' })).toBeVisible();
});



test('cancel order', async ({ page }) => {
  await page.getByRole('button', { name: 'Checkout cart' }).click();
  await expect(page.getByRole('button', { name: 'Cancel order' })).toBeEnabled();
  page.getByRole('button', { name: 'Cancel order' }).click();
  await expect(page.getByText('Order cancelled.')).toBeVisible();
});