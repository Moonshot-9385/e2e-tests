import { test, expect } from '@playwright/test';
import { createOrderAPI } from '../../hooks/create-order-api';

let orderId: string;


test.beforeAll(async ({ request }) => {
  const OrderData = await createOrderAPI(request);
  orderId = OrderData.data.id;

});

test('modifier order', async ({ request }) => {
  const OrderStatus = "cancelled"
  const putRequest = await request.put(`orders/${orderId}`, {
    data: {
     "status": OrderStatus
    },
  });
  const jsonResponse = await putRequest.json();
  //expect(putRequest.ok()).toBeTruthy();
  //expect(putRequest.status()).toBe(200);
 expect(jsonResponse.data.status).toBe(OrderStatus);

});


test('delete order', async({request})=> {
const deleterequest = await request.delete(`orders/${orderId}`)
expect(deleterequest.ok()).toBeTruthy();
const getrequest = await request.get(`orders/${orderId}`);
expect(getrequest.status()).toBe(404);
});


