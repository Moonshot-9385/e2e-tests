import { test, expect } from '@playwright/test';
/*import { createOrderUI } from '../../hooks/create-order-ui';

test.beforeEach(async ({ page }) => {
  await createOrderUI(page);
});*/

test('modifier order', async ({ page }) => {
    await page.goto('/carts');
  await expect(page.getByTestId('sidebar-carts')).toBeVisible();
  await page.getByLabel('Status').selectOption('All statuses');
  await page.getByLabel('Customer').selectOption('Jordan Lee');
  await page.getByRole('button', { name: 'Create cart' }).click();
await page.getByRole('link', { name: /cart_/ }).first().click();
 await expect(page.getByText('Loading cart customer...')).toBeVisible();
 await page.getByRole('button', { name: 'Add item' }).click();
 await expect(page.getByText('Item added.')).toBeVisible();
  await page.getByRole('button', { name: 'Remove' }).click();
    await page.getByLabel('Product').selectOption('QA Hoodie');
    await page.getByRole('button', { name: 'Add item' }).click();
    await page.getByRole('button', { name: 'Checkout cart' }).click();
    await expect(page.getByText('Item added.')).toBeVisible();
});



test('cancel order', async ({ page }) => {
      await page.goto('/carts');
  await expect(page.getByTestId('sidebar-carts')).toBeVisible();
  await page.getByLabel('Status').selectOption('All statuses');
  await page.getByLabel('Customer').selectOption('Jordan Lee');
  await page.getByRole('button', { name: 'Create cart' }).click();
await page.getByRole('link', { name: /cart_/ }).first().click();
 await expect(page.getByText('Loading cart customer...')).toBeVisible();
 await page.getByRole('button', { name: 'Add item' }).click();
 await expect(page.getByText('Item added.')).toBeVisible();
  await page.getByRole('button', { name: 'Checkout cart' }).click();
  await expect(page.getByRole('button', { name: 'Cancel order' })).toBeEnabled();
  page.getByRole('button', { name: 'Cancel order' }).click();
  await expect(page.getByText('Order cancelled.')).toBeVisible();
});