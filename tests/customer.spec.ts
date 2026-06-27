import { test, expect } from '@playwright/test';

test('add customer', async ({ page }) => {
  test.setTimeout(15000);
  await page.goto('/customers');
  await expect(page.getByTestId('sidebar-customers')).toBeVisible();
  await page.getByTestId('create-customer-button').click();
  await page.getByLabel('Name').fill('Hamza Elfathi');
  await page.getByLabel('Email').fill('elf123@sfr.fr');
  await page.getByLabel('Status').selectOption('Active');
  await page.getByRole('button', { name: 'Save customer' }).click();
  await page.getByTestId('sidebar-customers').click();
  await expect(page.getByRole('link', { name: 'Hamza Elfathi' })).toBeVisible({ timeout: 10000 });
});


test('delete customer', async ({ page }) => {
  test.setTimeout(20000);
  await page.goto('/customers');
  await expect(page.getByTestId('sidebar-customers')).toBeVisible();
  await page.getByTestId('create-customer-button').click();
  await page.getByLabel('Name').fill('Hamza Elfathi');
  await page.getByLabel('Email').fill('elf123@sfr.fr');
  await page.getByLabel('Status').selectOption('Active');
  await page.getByRole('button', { name: 'Save customer' }).click();
  await page.waitForURL('**/customers/*');
  await page.getByRole('button', { name: 'Delete customer' }).click({ timeout: 10000 });
  await page.waitForURL('**/customers');
  await expect(page.getByRole('link', { name: 'Hamza Elfathi' })).not.toBeVisible({ timeout: 10000 });
});

