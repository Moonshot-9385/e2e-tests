
import { test, expect } from '@playwright/test';

test('lister les produits', async ({ request }) => {
  test.setTimeout(14);
  const getrequest = await request.get('products');
  const jsonresponse = await getrequest.json();
  console.log(' Liste des produits : ');
  console.log(jsonresponse);
  console.log('');
  expect(getrequest.status()).toBe(200);
});



test('afficher keyboard', async ({ request }) => {
  const getrequest = await request.get('products/prod_keyboard');
  const jsonresponse = await getrequest.json();
  console.log('keyboard price is :');
   console.log(jsonresponse.data.price);
  console.log('');
    expect(getrequest.status()).toBe(200);
});



test('update keyboard price', async ({ request }) => {
  const getrequest = await request.put('products/prod_keyboard', {
    data: {
      "id": "prod_keyboard",
    "name": "Mechanical Keyboard",
    "description": "A compact mechanical keyboard for desk setups.",
    "price": 150,
    "category": "Accessories",
    "stock": 10,
    "status": "active",
    } 
  });
  const jsonresponse = await getrequest.json();
  console.log('keyboard price updated :');
  console.log(jsonresponse);
  console.log('');
  expect(getrequest.status()).toBe(200);
});





test('Delete Mac13', async ({ request }) => {
  const request1 = await request.post('products', {

    data: {
    "id": "Mac13",
    "name": "Laptop MacBook Pro 13",
    "description": "A powerful laptop for professionals.",
    "price": 1520,
    "category": "electronics",
    "stock": 4,
    "status": "active",
    } 
  });
    const jsonresponse1 = await request1.json();
    expect(request1.status()).toBe(201);

const ID = jsonresponse1.data.id;
  const deleterequest = await request.delete(`products/${ID}`, {
  });
 const deletejson = await deleterequest.json();
 expect(deleterequest.status()).toBe(200);
  console.log(deletejson);
  console.log('');
  });

