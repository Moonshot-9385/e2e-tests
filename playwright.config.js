import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: { timeout: 5000 },

  projects: [
    // 1. On crée le projet de Setup qui va s'exécuter en premier
    {
      name: 'setup',
      testMatch: /.*\.setup\.js/, // va chercher notre fichier auth.setup.js
    },

    // 2. Tes projets de tests standards
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // On indique à Chromium d'utiliser la session sauvegardée
        storageState: 'playwright/.auth/user.json',
      },
      testMatch: '**/*.spec.ts',
      // IMPORTANT : Ce projet dépend de la réussite du projet 'setup'
      dependencies: ['setup'],
        },
  ],
});

