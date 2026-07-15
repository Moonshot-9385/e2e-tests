import { test, expect } from '@playwright/test';
import { createCustomerAPI } from '../../hooks/create-customer-api';



let customerId: string;
let customerEmail: string;
let customerStatus: string;

test.beforeEach(async ({ request }) => {
  const customerData = await createCustomerAPI(request);
  customerId = customerData.data.id;
  customerEmail = customerData.data.email;
  customerStatus = customerData.data.status;
});


test('get 1 customer', async ({ request }) => {
  const getRequest = await request.get(`customers/${customerId}`);
  const jsonResponse = await getRequest.json();
  expect(jsonResponse.data.id).toBe(customerId);
  expect(jsonResponse.data.email).toBe(customerEmail);
  expect(jsonResponse.data.status).toBe(customerStatus);
});



test('get all customer', async ({ request }) => {
  const getRequest = await request.get('customers');
  expect(getRequest.status()).toBe(200);
  expect(getRequest.ok()).toBeTruthy();
  const jsonResponse = await getRequest.json();
  expect(jsonResponse.data.length).toBeGreaterThan(0);
});



test(' delete customer', async ({ request }) => {
  const deleteRequest = await request.delete(`customers/${customerId}`);
  const getrequest = await request.get(`customers/${customerId}`);
  expect(getrequest.status()).toBe(404);
  expect(deleteRequest.ok()).toBeTruthy();

});





test('modify customer', async ({ request }) => {
  const customerEmail = `lionel.${Date.now()}@example.com`;
  const putRequest = await request.put(`customers/${customerId}`, {
    data: {
      name: 'lionel messi',
      email: customerEmail,
      status: 'active',
    },
  });
  const jsonResponse = await putRequest.json();
  expect(putRequest.ok()).toBeTruthy();
  expect(putRequest.status()).toBe(200);
  expect(jsonResponse.data.email).toBe(customerEmail);
});

