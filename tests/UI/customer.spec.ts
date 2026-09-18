import { test, expect } from '@playwright/test';
import { createCustomerUI } from '../../hooks/create-customer-ui';
import{ CustomersPage } from './customers-page';

test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }) => {
  await createCustomerUI(page);
});

test('modifier customer', async ({ page }) => {
  const customersPage = new CustomersPage(page);
  const email = `hamza.${crypto.randomUUID()}@gmail.com`;

  await customersPage.modifyCustomer('Hamza Elfathi', email , 'Inactive');
  await expect(customersPage.CustomerName).toHaveText('Hamza Elfathi');

});


test('delete the customer', async ({ page }) => {
  const customersPage = new CustomersPage(page);
  await customersPage.deleteCustomer();
  await expect(customersPage.getCustomerLink('hamza hamza')).not.toBeVisible();
});



