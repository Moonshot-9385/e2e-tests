import { expect, type Page } from '@playwright/test';
import { productsPage } from '../tests/UI/products-page.ts';
export async function createProductUI(page: Page) {

const productspage = new productsPage(page);
  await productspage.createProduct('Mac13', '1200', 'Active');
  await productspage.descriptionInput.fill('abc');
  await productspage.stockInput.fill('3');
  await productspage.categoryInput.fill('electronique');
  await productspage.saveProductButton.click();
  await expect(productspage.productName).toHaveText('Mac13');
  await expect(productspage.CreationSuccessMessage).toBeVisible();
}