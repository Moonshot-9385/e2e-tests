// tests/auth.setup.ts
import { test as setup, expect } from '@playwright/test';
import fs from 'fs'; // read write
import path from 'path';  //chemin du fichier
import process from 'process';


const login = 'playwright/.auth/user.json';  // chemin de sauvegarde

setup('authentification', async ({ page }) => {
  const email = process.env.USER_EMAIL;
  const password = process.env.USER_PASSWORD;
  const url = process.env.APP_BASE_URL;
  await page.goto(url);

  await page.getByTestId('login-email').fill(email);
  await page.getByTestId('login-password').fill(password);
  await page.getByRole('button', { name: 'sign in' }).click();

  await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();

  fs.mkdirSync(path.dirname(login), { recursive: true }); // creer un dossier soit parent si manquant
  await page.context().storageState({ path: login }); // stock les cookies dans le storagestate
});
