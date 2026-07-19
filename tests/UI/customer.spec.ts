import { test, expect } from '@playwright/test';
import { createCustomerUI } from '../../hooks/create-customer-ui';
test.describe.configure({ mode: 'parallel' });

test.beforeEach(async ({ page }) => {
  await createCustomerUI(page);
});

test('modifier customer', async ({ page }) => {
  const email = `hamza.${crypto.randomUUID()}@gmail.com`;
  await page.goto('/customers');
  await page.getByRole('link', { name: 'HElfathi' }).first().click();
  await page.getByLabel('Name').fill('Hamza Elfathi');
  await page.getByLabel('Email').fill(email);
  await page.getByRole('button', { name: 'Save changes' }).click();
  //await expect(page.getByRole('heading', { name: 'Hamza Elfathi' })).toBeVisible();
});


test('delete customer', async ({ page }) => {
  await page.getByRole('button', { name: 'Delete customer' }).click();
  await expect(page.getByRole('link', { name: 'Hamza Elfathi' })).not.toBeVisible();
});
