import { expect, type Page } from '@playwright/test';
import { CustomersPage } from '../tests/UI/customers-page.ts';
export async function createCustomerUI(page: Page) {
  const uniqueEmail = `hamza.${Date.now()}@sfr.fr`;
  const customersPage = new CustomersPage(page);
  await customersPage.createCustomer('hamza hamza', uniqueEmail, 'Active');
  return { email: uniqueEmail };
} 


