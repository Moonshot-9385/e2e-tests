import { defineConfig, devices } from '@playwright/test';

const url = 'https://moonshot-dashboard-test.vercel.app/api/';
const token1 = 'Bearer ms_api_test_7d1f4a8c2e9b3f6d5a0c1e4b8f2a9d6c3b7e0a1f';

export default defineConfig({
  // Dossier des tests
  testDir: './tests',

  // Parallélisme
  fullyParallel: true,
  workers: 2,


  // Sécurité CI
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 4 : 0,

  // Rapport
  reporter: 'html',

  //mes variables api

  use: {
    baseURL: url,
    extraHTTPHeaders: {
      'Authorization': token1,
    },
  },

 
  projects: [
    // Authentification.......
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