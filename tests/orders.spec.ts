import { test, expect } from '@playwright/test';

test('add order', async ({ page }) => {
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

});



test('cancel order', async ({ page }) => {

  test.setTimeout(20000);
  await page.goto('/carts');
  await expect(page.getByTestId('sidebar-carts')).toBeVisible();
  await page.getByLabel('Status').selectOption('All statuses');
  await page.getByLabel('Customer').selectOption('Jordan Lee');
  await page.getByRole('button', { name: 'Create cart' }).click();
  await page.getByRole('link', { name: /cart_/ }).first().click();
  await expect(page.getByText('Loading cart customer...')).toBeHidden({ timeout: 10000 });
  await page.getByRole('button', { name: 'Add item' }).click();
  await expect(page.getByText('Item added.')).toBeVisible();
  await page.getByRole('button', { name: 'Checkout cart' }).click();
  const cancelBtn = page.getByRole('button', { name: 'Cancel order' });
  await expect(cancelBtn).toBeEnabled({ timeout: 10000 });
  await cancelBtn.click();
  await expect(page.getByText('Order cancelled.')).toBeVisible();
});