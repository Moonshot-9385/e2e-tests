import{expect}from'@playwright/test'
export async function createProductUI(page){
  await page.goto('products');
  await page.getByTestId('sidebar-products').click();
  await page.getByTestId('create-product-button').click();
  await page.getByLabel('Name').fill('Mac13');
  await page.getByLabel('Description').fill('256gb,8gb Ram');
  await page.getByLabel('Price').fill('1200');
  await page.getByLabel('Stock').fill('3');
  await page.getByLabel('Category').fill('electronique');
  await page.getByLabel('Status').selectOption('Active');
  await page.getByRole('button', { name: 'Save product' }).click();
  await expect(page.getByText('Created')).toBeVisible();
}