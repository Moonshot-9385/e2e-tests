import { test, expect } from '@playwright/test';
test.describe('test a', () => {
  // Plus besoin de taper les identifiants, Playwright injecte la session automatiquement !
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
  });

  test('test check', async ({ page }) => {
    await expect(page.getByTestId('shopping-cart-link')).toBeEnabled();
    await expect(page.getByRole('button', { name: 'Open Menu' })).toBeEnabled();
    await page.getByTestId('product-sort-container').click();
    await expect(page.getByRole('option')).toHaveCount(6);
    await page.getByTestId('product-sort-container').selectOption({ label: 'Price (low to high)' });
  });

  test('test demo', async ({ page }) => {
    await expect(page.getByTestId('footer-copy')).toBeVisible();
    await expect(page.getByTestId('footer-copy')).toContainText('2026');
    await expect(page.getByTestId('social-linkedin')).toBeVisible();
    await expect(page.getByTestId('social-facebook')).toBeVisible();
    await expect(page.getByTestId('social-twitter')).toBeVisible();
    await expect(page.getByTestId('inventory-list')).toHaveCount(1);
    await expect(page.getByAltText('Sauce Labs Bike Light')).toBeVisible();
    await expect(page.getByTestId('inventory-item-desc')).toHaveCount(6);
    
    // Note : On retire le clic sur "logout" à la fin pour éviter de détruire 
    // la session de notre fichier JSON pour les tests suivants.
  });
});
