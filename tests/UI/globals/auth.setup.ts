import { test as setup, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import process from 'process';

// Cible le même fichier absolu à la racine du projet
const login = path.resolve('.auth/user.json'); 

setup('authentification', async ({ page }) => {
  const email = `${process.env.USER_EMAIL}`;
  const password = process.env.USER_PASSWORD;
  const url = `${process.env.APP_BASE_URL}`
  
  await page.goto(url);

  await page.getByTestId('login-email').fill(email);
  await page.getByTestId('login-password').fill(password);
  await page.getByRole('button', { name: 'sign in' }).click();

  // Attente de sécurité : garantit que la session est valide avant d'enregistrer
  await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();

  // Crée le dossier .auth à la racine s'il n'existe pas, puis sauvegarde l'état
  fs.mkdirSync(path.dirname(login), { recursive: true });
  await page.context().storageState({ path: login });
});