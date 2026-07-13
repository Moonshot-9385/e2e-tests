import {APIRequestContext, expect} from '@playwright/test';

export async function createCustomer(request: APIRequestContext) {

const email = `lionel.${crypto.randomUUID()}@example.com`;
const postrequest = await request.post(`customers`, { 

    data: {
        
        "name": "lionel messi",
        "email": email, 
        "status": "active",
    }

  });

  const jsonresponse = await postrequest.json();
  expect(postrequest.status()).toBe(201);
  expect(jsonresponse.data.name).toBe('lionel messi');
  expect(jsonresponse.data.email).toBe(email);
  expect(jsonresponse.data.status).toBe('active');
  return jsonresponse; // pour les autres tests
    }