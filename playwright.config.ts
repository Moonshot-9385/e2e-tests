import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Charge les variables d'environnement
dotenv.config();

// Résolution du chemin absolu à la racine du projet (compatible ES Modules)
const STORAGE_STATE_PATH = path.resolve('.auth/user.json');

export default defineConfig({
  // Dossier racine des tests
  testDir: './tests',

  // Configuration du parallélisme
  fullyParallel: true,
  
  // 1 seul worker en CI pour éviter les conflits d'accès au fichier user.json
  workers: process.env.CI ? 1 : 3,

  // Sécurité et résilience
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1, 
  
  // Génération des rapports
  reporter: 'html',

  // Configuration globale (Traces et captures d'écran)
  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    // 1. Le Setup (Exécuté en premier)
    {
      name: 'setup',
      testDir: './tests/UI',
      testMatch: /auth\.setup\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome', 
        baseURL: process.env.APP_BASE_URL,
      },
    },
  
    // 2. Le Teardown 
    {
      name: 'teardown',
      testDir: './tests/UI',
      testMatch: /auth\.teardown\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome', 
        baseURL: process.env.APP_BASE_URL,
      },
    },

    // 3. Les Tests UI (Dépendent du setup et utilisent le stockage absolu)
    {
      name: 'ui-tests',
      testDir: './tests/UI', 
      dependencies: ['setup'], 
      teardown: 'teardown',  
      testMatch: /.*\.spec\.ts$/,
      testIgnore: [/auth\.setup\.ts/, /auth\.teardown\.ts/],
      workers: 1,
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        baseURL: process.env.APP_BASE_URL, 
        storageState: STORAGE_STATE_PATH,
      },
    },

    // 4. Les Tests API (Indépendants de l'UI)
    {
      name: 'api-tests',
      testDir: './tests/API', 
      testMatch: /.*\.spec\.ts$/,
      workers: 1,
      use: {
        ...devices['Desktop Chrome'], 
        channel: 'chrome',
        baseURL: process.env.APP_BASE_URL, // Aligné sur l'URL de base pour correspondre à vos requêtes
        extraHTTPHeaders: {
          'Authorization': `Bearer ${process.env.API_TOKEN}`,
        },
      },
    },
  ],
});