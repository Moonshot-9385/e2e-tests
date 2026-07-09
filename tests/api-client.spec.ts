
import { test, expect } from '@playwright/test';


test('get 1 customer', async ({ request }) => {
  const Id = 'cust_mrayef18_ei65i0';
  const getrequest = await request.get(`customers/${Id}`, {
  });
  expect(getrequest.status()).toBe(200);
  const jsonresponse = await getrequest.json();
  console.log('customer name is :');
  console.log(jsonresponse.data.name);
  console.log('');
});






test('get all customer', async ({ request }) => {
  const getrequest = await request.get(`customers`);
  expect(getrequest.status()).toBe(200);
  const jsonresponse = await getrequest.json();
  console.log('customer name is :');
  console.log(jsonresponse);
  console.log('');
});





test('create and delete customer', async ({ request }) => {
  test.setTimeout(15000);
  const postrequest = await request.post(`customers`, {
    data: {

        "name": "lionel messi",
        "email": "lionel@example.com",
        "status": "active",
    }

  });
  const jsonresponse = await postrequest.json();
  console.log('Customer created :');
  console.log('');
  expect(postrequest.status()).toBe(201);
  console.log(jsonresponse);
  console.log('');


 const ID = jsonresponse.data.id;
 const delete1 = await request.delete(`customers/${ID}`);
const deletejson = await delete1.json();  
console.log('Customer deleted :');
console.log('');
console.log(deletejson);
console.log('');
});






test('Modifier customer', async ({ request }) => {
  test.setTimeout(15000);
const getrequest = await request.post(`customers`, {
    data: {
  
        "name": "lionel messi",
        "email": "lionel@example.com",
        "status": "active",
    }
  });
  const jsonresponse = await getrequest.json();
  console.log('Customer created :');
  console.log(jsonresponse);
  expect(getrequest.status()).toBe(201);
  console.log('');


 const ID = jsonresponse.data.id;
 const putrequest = await request.put(`customers/${ID}`, {
    data: {
  "name" : "lionel messi",
  "email": "messi@example.com",
  "status": "active"
    }
  });
  const jsonresponse2 = await putrequest.json();
  console.log('Customer updated :');
  console.log(jsonresponse2);
  console.log('');


  const ID2 = jsonresponse2.data.id;
 const deleterequest = await request.delete(`customers/${ID2 }`);
const deletejson = await deleterequest.json();
console.log('Customer deleted successfully:');
console.log(deletejson);
console.log('');
expect(deleterequest.status()).toBe(200);
});
 