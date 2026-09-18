import { Page, Locator,expect } from '@playwright/test'
export class SetPage{
    page:Page;
   StoreName:Locator;
   Currency:Locator;
   Savebutton:Locator;
   Saving:Locator;

    constructor(page:Page){
        this.page=page;
        this.StoreName = page.getByLabel('Store name');
        this.Currency=page.getByLabel('Currency')
        this.Savebutton=page.getByRole('button', { name: 'Save settings' })
   this.Saving=page.getByText('Settings saved.')
    }

    async change(){
     await this.page.goto('/settings');
    await this.StoreName.fill('Moonshot');
  await this.Currency.selectOption('EUR');
   await this.Savebutton.click();
  await expect(this.Saving).toBeVisible();
    }
}