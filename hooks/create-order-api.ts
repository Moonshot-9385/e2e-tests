import { APIRequestContext, expect } from '@playwright/test';
export async function createOrderAPI(request: APIRequestContext) {

  const productId = "prod_mrm2pmie_9mzjri";
  const quantity = 3
   const customerid = "cust_mrkv695z_w2g4gu";

  const createOrder = await request.post('orders', {
    data:
        {
  "customerId": customerid,
  "items": [
        {
      "productId": productId,
      "quantity": quantity
        }
 
  ]
}
    
  });

  expect(createOrder.ok()).toBeTruthy();
  const jsonResponse = await createOrder.json();
  expect(jsonResponse.data.customerId).toBe(customerid);
   //expect(jsonResponse.data.productId).toBe(productId);
   // expect(jsonResponse.data.quantity).toBe(quantity);
  return jsonResponse;
}
