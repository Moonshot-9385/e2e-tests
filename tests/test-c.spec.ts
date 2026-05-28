import { test, expect } from '@playwright/test';
import { login } from '../hooks/login'; 

test.describe('test c', () => {
  
  test.beforeEach(async ({ page }) => {
    await login(page);
  });
/
  // 2. Ajouter deux articles différents depuis le catalogue
  test('test check', async ({ page }) => {
    // Article 1 : Le sac à dos (Sauce Labs Backpack)
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    
    // Article 2 : La lampe de vélo (Sauce Labs Bike Light)
    // Note : .nth(0) c'est la même chose que .first(). Si le bouton du sac à dos 
    // change de texte après le clic, ça marche, sinon tu risques de cliquer deux fois sur le même !
    await page.getByRole('button', { name: 'Add to cart' }).nth(0).click(); 


    // 3. Cliquer sur le panier pour voir où sont les articles
    await page.locator('.shopping_cart_link').click();

    // 4. Vérifier que nous sommes bien dans le panier
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

    // 5. Vérifier que les deux articles spécifiques sont bien p
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
    

    // 6. Cibler le bouton Checkout et s'assurer qu'il est cliquable (Enabled)
    const checkoutButton = page.getByRole('button', { name: 'Checkout' });
    await expect(checkoutButton).toBeVisible();
    await expect(checkoutButton).toBeEnabled();
  }); ///
  //

}); 