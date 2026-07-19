import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Charge les variables d'environnement
dotenv.config();

export default defineConfig({
  // Dossier racine des tests
  testDir: './tests',

  // Configuration du parallélisme
  fullyParallel: false,
  // 4 workers en local pour aller vite, 1 seul en CI pour éviter les surcharges de mémoire et la corruption de fichiers
  workers: process.env.CI ? 1 : 4,

  // Sécurité et résilience
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 4 : 1, // En local, 1 retry aide à stabiliser les faux négatifs de connexion

  // Génération des rapports
  reporter: 'html',

  // Configuration globale (API par défaut)
  use: {
    baseURL: `${process.env.APP_BASE_URL}/api/`,
    extraHTTPHeaders: {
      'Authorization': `Bearer ${process.env.API_TOKEN}`,
    },
    // Ajout de la gestion automatique des traces et captures en cas d'échec
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
      },
    },

    // 3. Les Tests UI (Dépendent du setup et appellent le teardown à la fin)
    {
      name: 'ui-tests',
      testDir: './tests/UI', 
      dependencies: ['setup'], 
      teardown: 'teardown',  
      testMatch: /.*\.spec\.ts$/,
      testIgnore: [/auth\.setup\.ts/, /auth\.teardown\.ts/],
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        storageState: 'playwright/.auth/user.json',
      },
    },

    // 4. Les Tests API (Indépendants de l'UI et du stockage d'authentification)
    {
      name: 'api-tests',
      testDir: './tests/API', 
      testMatch: /.*\.spec\.ts$/,
      use: {
        // Pour de l'API pure, pas besoin de charger l'émulation d'un navigateur complet, 
        // mais si tu as besoin de jetons de session contextuels, on garde la base Chrome.
        ...devices['Desktop Chrome'], 
         channel: 'chrome',
      },
    },
  ],
});