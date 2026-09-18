import { Page, Locator, expect } from '@playwright/test';

export class SetupPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByTestId('login-email');
    this.passwordInput = page.getByTestId('login-password');
    this.submitButton = page.getByRole('button', { name: 'sign in' });
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async login(email: string, pass: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.submitButton.click();
    await expect(this.logoutButton).toBeVisible();
  }
}