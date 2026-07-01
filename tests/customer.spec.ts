import { test, expect } from '@playwright/test';

test('add customer', async ({ page }) => {
  test.setTimeout(110);
  const uniqueEmail = `hamza.${Date.now()}@sfr.fr`;
  
  await page.goto('/customers');
  await expect(page.getByTestId('sidebar-customers')).toBeVisible();
  await page.getByTestId('create-customer-button').click();
  await page.getByLabel('Name').fill('H Elfathi');
  await page.getByLabel('Email').fill(uniqueEmail );
  await page.getByLabel('Status').selectOption('Active');
  
  await page.getByRole('button', { name: 'Save customer' }).click();
  await expect(page.getByRole('button', { name: 'Delete customer' })).toBeVisible({ timeout: 10000 });
  await page.getByTestId('sidebar-customers').click();
  await expect( page.getByRole('link', { name: 'H Elfathi' })).toBeEnabled ;
});

test('delete customer', async ({ page }) => {
  test.setTimeout(25000);
   const uniqueEmail = `hamza.${Date.now()}@sfr.fr`;
  await page.goto('/customers');
  await expect(page.getByTestId('sidebar-customers')).toBeVisible();
  await page.getByTestId('create-customer-button').click();
  await page.getByLabel('Name').fill('Hamza Elfathi');
  await page.getByLabel('Email').fill(uniqueEmail);
  await page.getByLabel('Status').selectOption('Active');
  await page.getByRole('button', { name: 'Save customer' }).click();
  await page.getByRole('button', { name: 'Delete customer' }).click();
  await expect(page.getByRole('link', { name: 'Hamza Elfathi' })).not.toBeVisible({ timeout: 10000 });
});

