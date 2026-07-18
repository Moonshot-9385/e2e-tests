import { test, expect } from '@playwright/test';
import { createCartAPI } from '../../hooks/create-cart-api';

let cartId: string;


test.beforeAll(async ({ request }) => {
  const cartData = await createCartAPI(request);
  cartId = cartData.data.id;
});

test('modify cart', async ({ request }) => {
  const Status = "abandoned"
  const putRequest = await request.put(`carts/${cartId}`, {
    data: {
  "status": Status
    },
  });
  expect(putRequest.status()).toBe(200);
  const jsonResponse = await putRequest.json();
  expect(jsonResponse.data.status).toBe(Status);
});


test('delete cart', async({request})=> {
const deleterequest = await request.delete(`carts/${cartId}`)
expect(deleterequest.status()).toBe(200);
const getrequest = await request.get(`carts/${cartId}`);
expect(getrequest.status()).toBe(404);
});


