import { test, expect } from '@playwright/test';

test('add product', async ({ page }) => {
  await page.goto('/products');
  await page.getByTestId('sidebar-products').click();
  await page.getByTestId('create-product-button').click();
  await page.getByLabel('Name').fill('Mac13');
  await page.getByLabel('Description').fill('256gb,8gb Ram');
  await page.getByLabel('Price').fill('1200');
  await page.getByLabel('Stock').fill('3');
  await page.getByLabel('Category').fill('electronique');
  await page.getByLabel('Status').selectOption('Active');
  await page.getByRole('button', { name: 'Save product' }).click();
  await expect(page.getByText('Created')).toBeVisible();
});


test('delete product', async ({ page }) => {
  await page.goto('/products');
  await page.getByTestId('sidebar-products').click();
  await page.getByTestId('create-product-button').click();
  await page.getByLabel('Name').fill('Mac14');
  await page.getByLabel('Description').fill('512gb,16gb Ram');
  await page.getByLabel('Price').fill('1500');
  await page.getByLabel('Stock').fill('2');
  await page.getByLabel('Category').fill('electronique');
  await page.getByLabel('Status').selectOption('Active');
  await page.getByRole('button', { name: 'Save product' }).click();
  await expect(page.getByText('Created')).toBeVisible();
  await page.getByRole('button', { name: 'Delete product' }).click();
  await expect(page.getByText('Mac14')).not.toBeVisible(); 
});