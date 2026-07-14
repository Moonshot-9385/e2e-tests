import { chromium, defineConfig, devices } from '@playwright/test';

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





   //setup au debut
    {
      name: 'setup',
      testDir: './tests/UI',
      testMatch: /auth\.setup\.ts/,
    },
  

    {
      
      name: 'ui-tests',
      testDir: './tests/UI', // 
      dependencies: ['setup'],
      testMatch: /.*\.spec\.ts$/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },





    },

  
    {
      name: 'api-tests',
      testDir: './tests/API', 
      testMatch: /.*\.spec\.ts$/,
   use: {
        ...devices['Desktop Chrome'],
      },
    },


    //teardown a la fin des tests 
    {
      name: 'teardown',
      testDir: './tests/UI',
      testMatch: /auth\.teardown\.ts/,
      dependencies: ['ui-tests'],
    },
  ],

});