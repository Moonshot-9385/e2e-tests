import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';


dotenv.config();

export default defineConfig({
  // Dossier des tests
  testDir: './tests',

  // Parallélisme
fullyParallel: false,
workers: process.env.CI ? 1 : 4,


  // Sécurité CI
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 4 : 0,

  // Rapport
  reporter: 'html',

  //mes variables api

  use: {
    baseURL: process.env.APP_BASE_URL+"/api/",
    extraHTTPHeaders: {
      'Authorization': `Bearer ${process.env.API_TOKEN}`,
    },
  },

 
  projects: [





   //setup au debut
    {
      name: 'setup',
      testDir: './tests/UI',
      testMatch: /auth\.setup\.ts/,
    },
  
      //teardown a la fin des tests 
    {
      name: 'teardown',
      testDir: './tests/UI',
      testMatch: /auth\.teardown\.ts/,
    },

{
      name: 'ui-tests',
      testDir: './tests/UI', 
      dependencies: ['setup'], 
      teardown: 'teardown',  
      testMatch: /.*\.spec\.ts$/,
      testIgnore: [/auth\.setup\.ts/, /auth\.teardown\.ts/],
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
  ],

});