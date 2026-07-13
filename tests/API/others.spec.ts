
import { test, expect } from '@playwright/test';


test('lister les produits', async ({ request }) => {
  const getrequest = await request.get('products');
  const jsonresponse = await getrequest.json();
  console.log(' Liste des produits : ');
  console.log(jsonresponse);
  expect(getrequest.status()).toBe(200);
  expect(getrequest.ok()).toBeTruthy();
});


test('afficher keyboard', async ({ request }) => {
  const getrequest = await request.get('products/prod_keyboard');
  const jsonresponse = await getrequest.json();
  console.log('jsonresponse.data.price is :');
console.log(jsonresponse.data.price);
    expect(getrequest.status()).toBe(200);
    expect(getrequest.ok()).toBeTruthy();
    expect(jsonresponse.data.id).toBe('prod_keyboard');
    expect(jsonresponse.data.name).toBe('Mechanical Keyboard');
    expect(jsonresponse.data.price).toBe(150);
  console.log('');
  
});



test('update keyboard price', async ({ request }) => {
  const price1 = 150;
  const getrequest = await request.put('products/prod_keyboard', {
    data: {
      "id": "prod_keyboard",
    "name": "Mechanical Keyboard",
    "description": "A compact mechanical keyboard for desk setups.",
    "price": price1,
    "category": "Accessories",
    "stock": 10,
    "status": "active",
    } 
  });
  const jsonresponse = await getrequest.json();
  expect(getrequest.ok()).toBeTruthy();
  expect(jsonresponse.data.price).toBe(price1);
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
    expect(request1.ok()).toBeTruthy
    expect(jsonresponse1.data.name).toBe('Laptop MacBook Pro 13');
    expect(jsonresponse1.data.price).toBe(1520);
  

  const ID = jsonresponse1.data.id;
  const deleterequest = await request.delete(`products/${ID}`, {
  });
 const deletejson = await deleterequest.json();
 console.log(deleterequest.status())
 expect(deleterequest.ok()).toBeTruthy();
  });

