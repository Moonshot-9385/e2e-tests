import { Page, Locator , expect } from '@playwright/test';
export class CartsPage{
    page: Page;
    createCartButton:Locator;
    statusSelect:Locator;
    customerSelect:Locator;
    saveCartButton:Locator;
    deleteCartButton:Locator;
    sidebarlink:Locator;
    cartLink:Locator;
    emptyCartMessage:Locator;
    productSelect:Locator;
    addItemButton:Locator;
    checkoutCartButton:Locator;
    abandonCartButton: Locator;
    abandonedCartMessage: Locator;
    itemAddedMessage: Locator;

    constructor(page: Page){
        this.page= page;
        this.createCartButton=page.getByRole('button',{name:'Create cart'});
        this.statusSelect=page.getByLabel('Status');
        this.customerSelect=page.getByLabel('Customer');
        this.saveCartButton=page.getByRole('button',{name:'Save cart'});
        this.deleteCartButton=page.getByRole('button',{name:'Delete cart'})
        this.sidebarlink=page.getByRole('link',{name:'Carts'});
        this.cartLink=page.getByRole('link',{name:/cart_/}).first();
        this.emptyCartMessage=page.getByText('This cart is empty.');
        this.productSelect=page.getByLabel('Product');
        this.addItemButton=page.getByRole('button',{name:'Add item'});
        this.checkoutCartButton=page.getByRole('button',{name:'Checkout cart'});
        this.abandonCartButton=page.getByRole('button', { name: 'Abandon cart' });
        this.abandonedCartMessage=page.getByText('Cart abandoned.');
        this.productSelect=page.getByLabel('Product');
        this.itemAddedMessage=page.getByText('Item added.');
    }

    async createCart(status:string,customer:string){
         await this.page.goto('/carts');
        await this.sidebarlink.click();
        await this.statusSelect.selectOption(status);
        await this.customerSelect.selectOption(customer);
        await this.createCartButton.click();
    }

    async modifyCart(status:string,customer:string){
        await this.statusSelect.selectOption(status);
        await this.customerSelect.selectOption(customer);
        await this.createCartButton.click();
        await this.cartLink.click();
    
    }

    async addProductAndCheckout(product:string){
        await this.cartLink.click();
        await this.emptyCartMessage.waitFor();
        await this.productSelect.selectOption(product);
        await this.addItemButton.click();
        await this.checkoutCartButton.click();
    }

    async deleteCart(){
        await this.cartLink.click();
        await this.abandonCartButton.click();
        await expect(this.abandonedCartMessage).toBeVisible();
    }
}