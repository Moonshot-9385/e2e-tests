// tests/auth.teardown.ts
import { test as teardown } from '@playwright/test';
import fs from 'fs';

const login = 'playwright/.auth/user.json';

teardown('nettoyage', async ({ page }) => {
  // 1. On va sur le site pour se déconnecter
  await page.goto('/dashboard');
  const logoutButton = page.getByRole('button', { name: 'Logout' });
  
  if (await logoutButton.isVisible()) {
    await logoutButton.click();
  }

  // 2. On supprime le fichier de session sur l'ordinateur
  if (fs.existsSync(login)) {
    fs.unlinkSync(login);
    console.log(' Fichier user.json supprimé.');
  }
});