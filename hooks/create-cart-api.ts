import { APIRequestContext, expect } from '@playwright/test';
export async function createCartAPI(request: APIRequestContext) {

  const customerid = "cust_mrkv695z_w2g4gu";
  const createcart = await request.post('carts', {
    data: {
      "customerId": customerid
    }
  });

 expect(createcart.status()).toBeTruthy();
  const jsonResponse = await createcart.json();
  expect(jsonResponse.data.customerId).toBe(customerid);
  return jsonResponse;
}

