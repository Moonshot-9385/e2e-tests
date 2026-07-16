import { test, expect } from '@playwright/test';
import { createCartAPI } from '../../hooks/create-cart-api';

let cartId: string;


test.beforeEach(async ({ request }) => {
  const cartData = await createCartAPI(request);
  cartId = cartData.data.id;

});

test('modify cart', async ({ request }) => {
  const CartStatus = "abandoned"
  const putRequest = await request.put(`carts/${cartId}`, {
    data: {
  "status": CartStatus
    },
  });
  const jsonResponse = await putRequest.json();
  //expect(putRequest.ok()).toBeTruthy();
  expect(putRequest.status()).toBe(200);
  expect(jsonResponse.data.status).toBe(CartStatus);
});


test('delete cart', async({request})=> {
const deleterequest = await request.delete(`carts/${cartId}`)
const getrequest = await request.get(`carts/${cartId}`);
expect(getrequest.status()).toBe(404);
expect(deleterequest.ok()).toBeTruthy();
});


