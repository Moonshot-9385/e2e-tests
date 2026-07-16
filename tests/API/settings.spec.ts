import { test, expect } from '@playwright/test';

test('change currency' , async ({request})=> {
const currency = "EUR"
const changecurrency = await request.put('settings', {
  data: {
    storeName: "Moonshot Store",
    currency: currency,
    taxRate: 0.2,
    allowOutOfStockOrders: false
  }
});
expect(changecurrency.status()).toBe(200);
expect(changecurrency.ok()).toBeTruthy
const jsonResponse = await changecurrency.json();
expect(jsonResponse.data.currency).toBe(currency);
  });



