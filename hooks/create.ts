import{expect}from'@playwright/test'
export async function createProduct(request){
    
const createProduct = await request.post(`products`,{
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
  
  const jsonresponse = await createProduct.json();
    expect(createProduct.status()).toBe(201);
    expect(createProduct.ok()).toBeTruthy();
    return jsonresponse; // pour les autres tests

    }