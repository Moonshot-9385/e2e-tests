import { test as teardown } from '@playwright/test';
import fs from 'fs';

const login = 'playwright/.auth/user.json'; 

teardown('nettoyage', async ({ page }) => {
  const url = process.env.MOONSHOT_BASE_URL 
  // Navigation vers l'URL
  await page.goto(url);
  
  const logoutButton = page.getByRole('button', { name: 'Logout' });
  
  // Si le bouton de déconnexion est visible, on clique dessus
  if (await logoutButton.isVisible()) {
    await logoutButton.click(); 
  }
  
  // Supprime le fichier d'authentification pour vider la session
  if (fs.existsSync(login)) { 
    fs.unlinkSync(login); 
    console.log('Fichier user.json supprimé.');
  }
});