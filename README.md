# E2E Test Automation

End-to-end test automation project built with Playwright and TypeScript.

## What is tested

The test suite covers key user workflows (via UI and API), including:

- Authentication
- Product management
- Customer management
- Orders
- Shopping carts
- Application settings

## Tech stack

Playwright, TypeScript, Node.js, and GitHub Actions.

## Installation

```bash
npm install
npx playwright install
```

## Run the tests

```bash
npx playwright test
```

## CI

Tests run automatically through GitHub Actions on every pull request and push to the main branch.

## Test application URL

https://moonshot-dashboard-test.vercel.app/
