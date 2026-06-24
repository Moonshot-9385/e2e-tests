import { test, expect } from '@playwright/test';

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


test('delete customer', async ({ page }) => {
  await page.goto('/customers');
  await expect(page.getByTestId('sidebar-customers')).toBeVisible();
  await page.getByTestId('create-customer-button').click();
  await page.getByLabel('Name').fill('Hamza Elfathi');
  await page.getByLabel('Email').fill('elf123@sfr.fr');
  await page.getByLabel('Status').selectOption('Active');
  await page.getByRole('button', { name: 'Save customer' }).click();
  await page.getByTestId('sidebar-customers').click();
  await page.getByRole('link', { name: 'Hamza Elfathi' }).click();
  await page.getByRole('button', { name: 'Delete customer' }).click();
  await page.goto('/customers');
  await expect(page.getByRole('link', { name: 'Hamza Elfathi' })).not.toBeVisible();
});

test('delete order', async ({ page }) => {
  await page.goto('/orders');
  await expect(page.getByTestId('sidebar-orders')).toBeVisible();
  await page.getByRole('link', { name: 'ord_mqsk3z7c_aeqtka' }).click();
   await expect(page.getByRole('button', { name: 'Cancel order' })).toBeVisible();
   //si ordre  deja supprimé
  await expect(page.getByRole('button', { name: 'Cancel order' })).toBeDisabled();

});
