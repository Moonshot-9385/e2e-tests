import { test, expect } from '@playwright/test';
import { createCustomerUI } from '../../hooks/create-customer-ui';

// Changement ici : 'serial' car le second test dépend du premier
test.describe.configure({ mode: 'serial' });

test.beforeAll(async ({ browser }) => {
  // On crée un contexte et une page temporaire pour le hook
  const context = await browser.newContext();
  const tempPage = await context.newPage();
  
  // On exécute ton hook sur cette page
  await createCustomerUI(tempPage);
  
  // On nettoie après la création
  await tempPage.close();
  await context.close();
});

test('modifier customer', async ({ page }) => {
  const email = `hamza.${crypto.randomUUID()}@gmail.com`;
  await page.goto('/customers');
  await page.getByRole('link', { name: 'HElfathi' }).first().click();
  await page.getByLabel('Name').fill('Hamza Elfathi');
  await page.getByLabel('Email').fill(email);
  await page.getByRole('button', { name: 'Save changes' }).click();
  await expect(page.getByRole('heading', { name: 'Hamza Elfathi' })).toBeVisible();
});

test('delete customer', async ({ page }) => {
  await page.goto('/customers');
  await page.getByRole('link', { name: 'Hamza Elfathi' }).first().click();
  
  await page.getByRole('button', { name: 'Delete customer' }).click();
  await expect(page.getByRole('link', { name: 'Hamza Elfathi' })).not.toBeVisible();
});