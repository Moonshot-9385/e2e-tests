
/*import{expect}from'@playwright/test'
export async function createOrderUI(page){
  await page.goto('/carts');
  await expect(page.getByTestId('sidebar-carts')).toBeVisible();
  await page.getByLabel('Status').selectOption('All statuses');
  await page.getByLabel('Customer').selectOption('Jordan Lee');
  await page.getByRole('button', { name: 'Create cart' }).click();
await page.getByRole('link', { name: /cart_/ }).first().click();
 await expect(page.getByText('Loading cart customer...')).toBeVisible();
 await page.getByRole('button', { name: 'Add item' }).click();
 await expect(page.getByText('Item added.')).toBeVisible();

};