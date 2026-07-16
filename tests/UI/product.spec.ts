import { test, expect } from '@playwright/test';
import { createProductUI } from '../../hooks/create-product-ui';

test.beforeEach(async ({ page }) => {
  await createProductUI(page);
});


test('modifier product', async ({ page }) => {
await page.getByLabel('Name').fill('Mac13Pro');
await page.getByLabel('Price').fill('1400');
await page.getByRole('button', { name: 'Save changes' }).click();
await expect(page.getByRole('heading', { name: 'Mac13Pro' })).toBeVisible();
await expect(page.getByLabel('price')).toHaveValue('1400');

});


test('delete product', async ({ page }) => {
expect( page.getByRole('button', { name: 'Delete product' })).toBeEnabled;
  await page.getByRole('button', { name: 'Delete product' }).click();
  await expect(page.getByText('Mac13')).not.toBeVisible(); 
});