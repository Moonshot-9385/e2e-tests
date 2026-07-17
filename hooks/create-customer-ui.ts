import{expect}from'@playwright/test'
export async function createCustomerUI(page){
      const uniqueEmail = `hamza.${Date.now()}@sfr.fr`;
      await page.goto('customers');
      //await expect(page.getByTestId('sidebar-customers')).toBeVisible();
      await page.getByTestId('create-customer-button').click();
      await page.getByLabel('Name').fill('HElfathi');
      await page.getByLabel('Email').fill(uniqueEmail );
      await page.getByLabel('Status').selectOption('Active');
      await page.getByRole('button', { name: 'Save customer' }).click();
      await expect(page.getByRole('button', { name: 'Delete customer' })).toBeVisible();


    }


