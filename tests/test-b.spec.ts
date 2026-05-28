import { test, expect } from '@playwright/test';
test.describe('test b', () => {
  // Plus besoin de taper les identifiants, Playwright injecte la session automatiquement !
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
  });

test('checkout', async ({ page }) => {
await page.getByText('Bike Light').click();
await page.getByTestId('add-to-cart').click();
await page.getByTestId('shopping-cart-link').click();
await page.getByRole('button', { name: 'checkout' }).click();
await page.getByPlaceholder('first name').fill('hello');
await page.getByPlaceholder('last name').fill('hello');
await page.getByTestId('postalCode').fill('1234');
await page.getByRole('button', { name: 'continue' }).click();
await expect(page.getByTestId('total-label')).toContainText('10.79');
await page.getByRole('button', { name: 'finish' }).click();
await expect(page.getByText('Thank you for your order!')).toContainText('order');
await expect(page.getByTestId('complete-text')).toBeVisible();
   });
  
test('Remove', async ({ page }) => {
await page.getByText('Backpack').click();
await page.getByTestId('add-to-cart').click();
await page.getByTestId('shopping-cart-link').click();
await page.getByRole('button', { name: 'remove' }).click();
await expect(page.getByTestId('cart_list')).toHaveCount();
await page.getByRole('button', { name: 'continue shopping' }).click();
await page.getByRole('button', { name: 'Open Menu' }).click();
await page.getByRole('link', { name: 'logout' }).click();
});
