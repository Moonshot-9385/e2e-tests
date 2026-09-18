
import { test, expect } from '@playwright/test';
import{SetPage}from './Setting-page'

test.describe.configure({ mode: 'serial' });

test('change currency', async ({ page }) => {
  const Setpage = new SetPage(page)
await Setpage.change();
});
