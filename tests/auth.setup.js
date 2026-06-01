import { test as setup, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// On définit le chemin où sera stocké le fichier de session
const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // 1. Navigation et Login
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('performance_glitch_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'login' }).click();

// Replaces test-id with the semantic role of a dropdown
  await expect(page.getByRole('combobox')).toBeVisible();
  // 3. Sauvegarder l'état d'authentification (cookies, stockage local)
  // Ensure the target directory exists so storageState can write the file
  fs.mkdirSync(path.dirname(authFile), { recursive: true });
  await page.context().storageState({ path: authFile });
  
});

