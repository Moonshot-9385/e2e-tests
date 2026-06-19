import { test, expect } from '@playwright/test';

test('product', async ({ page }) => {
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

test('customer', async ({ page }) => {
  await page.goto('/customers');
  await expect(page.getByTestId('sidebar-customers')).toBeVisible();
  await page.getByTestId('create-customer-button').click();
  await page.getByLabel('Name').fill('Hamza Elfathi');
  await page.getByLabel('Email').fill('elf123@sfr.fr');
  await page.getByLabel('Status').selectOption('Active');
  await page.getByRole('button', { name: 'Save customer' }).click();
  await page.getByTestId('sidebar-customers').click();
  await expect(page.getByRole('link', { name: 'Hamza Elfathi' })).toBeEnabled; 
});

test('cart', async ({ page }) => {
  await page.goto('/carts');
  await expect(page.getByTestId('sidebar-carts')).toBeVisible();
  await page.getByLabel('Status').selectOption('All statuses');
  await page.getByLabel('Customer').selectOption('Hamza Elfathi');
  await  page.getByRole('button', { name: 'Create cart' }).click();
  await  page.getByRole('link', { name: 'cart_mql7wz1c_lbpunk' }).click();
 await expect(page.getByText('Customer: Hamza Elfathi')).toBeVisible();

});

test('currency', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.getByTestId('sidebar-settings')).toBeVisible();
    await page.getByLabel('Currency').selectOption('EUR'); 
    await page.getByRole('checkbox').click();
    await  page.getByTestId('save-settings-button').click();
    await page.goto('/dashboard');
    await expect(page.getByText('Moonshot uses EUR.')).toBeVisible();
});

