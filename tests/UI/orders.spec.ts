import { test, expect } from '@playwright/test';
import { createOrderUI } from '../../hooks/create-order-ui';
import { ordersPage } from './orders-page';

test.beforeEach(async ({ page }) => {
  await createOrderUI(page);
});


test('modifier order', async ({ page }) => {
const orderspage = new ordersPage(page);
await orderspage.modifyOrder('abc')
});

//it works
test('cancel order', async ({ page }) => {
  const orderspage = new ordersPage(page);
await orderspage.deleteOrder();
});