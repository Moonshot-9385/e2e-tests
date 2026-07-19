import { test, expect } from '@playwright/test';
import { createOrderUI } from '../../hooks/create-order-ui';

test.beforeEach(async ({ page }) => {
  await createOrderUI(page);
});

test('modifier order', async ({ page }) => {
  await page.getByRole('button', { name: 'Remove' }).click();
    await page.getByLabel('Product').selectOption('Mac13Pro');
    await page.getByRole('button', { name: 'Add item' }).click();
    await page.getByRole('button', { name: 'Checkout cart' }).click();
        await page.getByRole('button', { name: 'Ship' }).click();
    await expect(page.getByText('Order shipped.')).toBeVisible();
});


test('cancel order', async ({ page }) => {
await page.getByRole('button', { name: 'Checkout cart' }).click();
const cancel = page.getByRole('button', { name: 'Cancel order' })
 await expect(cancel).toBeVisible();
 await (cancel).click();
  await expect(page.getByText('Order cancelled.')).toBeVisible();
});