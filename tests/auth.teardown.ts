// tests/auth.teardown.ts
import { test as teardown } from '@playwright/test';
import fs from 'fs';

const login = 'playwright/.auth/user.json';  //le chemin qu'on veux

teardown('nettoyage', async ({ page }) => {
  await page.goto('/dashboard');
  const logoutButton = page.getByRole('button', { name: 'Logout' });
  
  if (await logoutButton.isVisible()) {
    await logoutButton.click(); // cas normal
  }
  if (fs.existsSync(login)) { //verifier la presence du storagestate
    fs.unlinkSync(login); // vider le storage state
    console.log(' Fichier user.json supprimé.');
  }
});