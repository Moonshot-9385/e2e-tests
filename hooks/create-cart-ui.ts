
import { Page, expect } from '@playwright/test';
import { CartsPage } from '../tests/UI/carts-page';
export async function createCartUI(page: Page) {
  
  const cartsPage = new CartsPage(page);
  await cartsPage.createCart('Open', 'Hamza Elfathi');
  await expect(cartsPage.cartLink).toBeVisible();
}


