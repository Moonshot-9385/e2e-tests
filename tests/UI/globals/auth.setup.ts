import { test as setup, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import process from 'process';
import { SetupPage } from './setup-page';

// Cible le même fichier absolu à la racine du projet
const login = path.resolve('.auth/user.json'); 

setup('authentification', async ({ page }) => {
  const setupPage = new SetupPage(page);
  
  await setupPage.goto(process.env.APP_BASE_URL!);
  await setupPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);

  fs.mkdirSync(path.dirname(login), { recursive: true });
  await page.context().storageState({ path: login });
});