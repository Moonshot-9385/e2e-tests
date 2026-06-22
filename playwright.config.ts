import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Dossier des tests
  testDir: './tests' ,

  // Parallélisme
  fullyParallel: true,
  workers: 4,

  // Sécurité CI
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 4 : 0,

  // Rapport
  reporter: 'html',

  // Configuration globale des tests
   use: {
    baseURL: 'https://moonshot-dashboard-test.vercel.app', 
    trace: 'on-first-retry',
    testIdAttribute: 'data-testid',
  },


  projects: [
    // Authentification..
    {
      name: 'setup', // nom donnée du projet 
      testMatch: /auth\.setup\.ts/, // nom du fichier 
    },// 
    
{
      name: 'teardown',
      testMatch: /auth\.teardown\.ts/,
    },
    // Tests Chromium authentifiés
    {
      name: 'chromium',
      dependencies: ['setup'], // execute auth setup before browser tests
      testMatch: /.*\.spec\.ts$/,
      testIgnore: /auth\.(setup|teardown)\.ts$/,
      use: {
        ...devices['Desktop Chrome'], // browser
        storageState: 'playwright/.auth/user.json', // les cookies du login qu'on recupere avant chaque test
      },
    },
  ],
});