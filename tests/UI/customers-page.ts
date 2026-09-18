import { Page, Locator, expect } from '@playwright/test';

export class CustomersPage {
    page: Page;
    createCustomerButton: Locator;
    nameInput: Locator;
    emailInput: Locator;
    statusSelect: Locator;
    saveCustomerButton: Locator;
    deleteCustomerButton: Locator;
    sidebarlink: Locator;
    CustomerName: Locator;
    saveChangesButton: Locator;



    constructor(page: Page) {
        this.page = page;
        this.sidebarlink = page.getByRole('link', { name: 'Customers' });
        this.createCustomerButton = page.getByTestId('create-customer-button');
        this.nameInput = page.getByLabel('Name');
        this.emailInput = page.getByLabel('Email');
        this.statusSelect = page.getByLabel('Status');
        this.saveCustomerButton = page.getByRole('button', { name: 'Save customer' });
        this.saveChangesButton = page.getByRole('button', { name: 'Save changes' });
        this.deleteCustomerButton = page.getByRole('button', { name: 'Delete customer' });
        this.CustomerName = page.getByRole('heading', { level: 1 });
        
    }

//le cas pour verifier le link sans devoir le changer a chaque fois
    getCustomerLink(name: string) {
   return this.page.getByRole('link', { name: name });
}

    async createCustomer(name: string, email: string, status: string) {
        await this.page.goto('/customers');
        await this.sidebarlink.click();
        await this.createCustomerButton.click();
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.statusSelect.selectOption(status);
        await this.saveCustomerButton.click();
        await expect(this.deleteCustomerButton).toBeVisible();
    }

    async modifyCustomer(name: string, email: string, status: string) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.statusSelect.selectOption(status);
        await this.saveChangesButton.click();


    }


    async deleteCustomer() {
    await this.deleteCustomerButton.click();

    }
}