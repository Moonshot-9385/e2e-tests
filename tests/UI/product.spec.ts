import { test, expect } from '@playwright/test';
import { createProductUI } from '../../hooks/create-product-ui';
import{ productsPage } from './products-page';

test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }) => {
  await createProductUI(page);
});


test('modifier product', async ({ page }) => {
  const productspage = new productsPage(page);
  await productspage.modifyProduct('Mac13Pro', '1400', 'Inactive');
  await expect(productspage.productName).toHaveText('Mac13Pro');
  await expect(productspage.ProductPrice).toHaveValue('1400');
});


test('delete product', async ({ page }) => {
const productspage = new productsPage(page);
await productspage.deleteProduct(); 
});