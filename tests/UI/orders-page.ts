import { Page, Locator,expect } from '@playwright/test'
export class ordersPage{
    page:Page;
    createOrderButton:Locator;
    statusSelect:Locator;
    customerSelect:Locator;
    saveOrderButton:Locator;
    deleteOrderButton:Locator;
    orderlink:Locator;
    productSelect:Locator;
    addItemButton:Locator;
    addingItemMessage:Locator;
    checkoutButton:Locator;
    ShipOrder:Locator;
    shippedOrder:Locator;
    CancelButton:Locator;
    CancelMessage:Locator;

    constructor(page:Page){
        this.page=page;
        this.createOrderButton=page.getByRole('button',{name:'Create cart'});
        this.statusSelect=page.getByLabel('Status');
        this.customerSelect=page.getByLabel('Customer');
        this.saveOrderButton=page.getByRole('button',{name:'Save order'});
        this.deleteOrderButton=page.getByRole('button',{name:'Delete order'});
        this.orderlink=page.getByRole('link', { name: /cart_/}).first()
        this.productSelect=page.getByLabel('Product');
        this.addItemButton=page.getByRole('button', { name: 'Add item' });
        this.addingItemMessage=page.getByText('Item added.');
        this.checkoutButton=page.getByRole('button', { name: 'Checkout cart' });
        this.ShipOrder=page.getByRole('button', { name: 'Ship order' })
        this.shippedOrder=page.getByText('Order shipped.')
        this.CancelButton=page.getByRole('button', { name: 'Cancel order' })
        this.CancelMessage=page.getByText('Order cancelled.')
    }

    async createOrder(status:string,customer:string){
        await this.page.goto('/carts');
        await this.statusSelect.selectOption(status);
        await this.customerSelect.selectOption(customer);
        await this.createOrderButton.click();
        await this.orderlink.click();

    }

    async modifyOrder(produit:string){
    await this.page.goto('/carts');
    await this.orderlink.click();
    await this.productSelect.selectOption(produit);
    await this.addItemButton.click();
     await expect(this.addingItemMessage).toBeVisible();
    await this.checkoutButton.click();
    await this.ShipOrder.click();
    await expect(this.shippedOrder).toBeVisible();
  

    }

    async deleteOrder(){
  await this.CancelButton.click();
  await expect(this.CancelMessage).toBeVisible();
    }
}   