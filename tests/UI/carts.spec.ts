
import { test, expect } from '@playwright/test';
import { createCartUI } from '../../hooks/create-cart-ui';
import { CartsPage } from './carts-page';
test.describe.configure({ mode: 'parallel' });

test.beforeEach(async({ page }) => {
  await createCartUI(page);
});

test('modifier cart', async ({ page }) => {
  const cartsPage = new CartsPage(page);
  await cartsPage.modifyCart('Open', 'lionel messi');
  await cartsPage.productSelect.selectOption('Mac13');
  await cartsPage.addItemButton.click();
  await cartsPage.checkoutCartButton.click();
  await expect(cartsPage.itemAddedMessage).toBeVisible();
});



test('abandon cart', async ({ page }) => {
const cartsPage = new CartsPage(page);
await cartsPage.deleteCart();

});






