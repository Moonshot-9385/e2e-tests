
import { test, expect } from '@playwright/test';
import { createCartUI } from '../../hooks/create-cart-ui';

test.describe.configure({ mode: 'serial' });

test.beforeEach(async({ page }) => {
  await createCartUI(page);
});

test('modifier cart', async ({ page }) => {
await expect(page.getByText('This cart is empty.')).toBeVisible();
await page.getByLabel('Product').selectOption('USB-C Hub');
 await page.getByRole('button', { name: 'Add item' }).click();
 await page.getByRole('button', { name: 'Checkout cart' }).click();
//await expect(page.getByText('USB-C Hub')).toBeVisible();
});



test('abondon cart', async ({ page }) => {
 await page.getByRole('button', { name: 'Abandon cart' }).click();
await expect(page.getByText('Cart abandoned.')).toBeVisible();

});

