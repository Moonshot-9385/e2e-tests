import { expect } from '@playwright/test';
export async function login(page) {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('performance_glitch_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'login' }).click();
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await expect(page.getByRole('link', { name: 'logout' })).toBeEnabled();
}