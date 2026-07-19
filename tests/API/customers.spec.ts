import { test, expect } from '@playwright/test';
import { createCustomerAPI } from '../../hooks/create-customer-api';



let customerId: string;
let customerEmail: string;
let customerStatus: string;

test.beforeAll(async ({ request }) => {
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
expect(deleteRequest.status()).toBe(200)
  const getrequest = await request.get(`customers/${customerId}`);
  expect(getrequest.status()).toBe(404);

});





test('modify customer', async ({ request }) => {
  const createdCustomer = await createCustomerAPI(request);
  const createdCustomerId = createdCustomer.data.id;
  const customerEmail = `lionel.${Date.now()}@example.com`;

  const putRequest = await request.put(`customers/${createdCustomerId}`, {
    data: {
      name: 'lionel messi',
      email: customerEmail,
      status: 'active',
    },
  });

  //expect(putRequest.status()).toBe(200);
  expect(putRequest.ok()).toBeTruthy();

  const jsonResponse = await putRequest.json();
  expect(jsonResponse.data.email).toBe(customerEmail);
});

