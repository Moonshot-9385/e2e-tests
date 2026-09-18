import{Page,Locator,expect}from'@playwright/test'
export class productsPage{
    page:Page;
    sidebarlink:Locator;
    createProductButton:Locator;
    nameInput:Locator;
    priceInput:Locator;
    statusSelect:Locator;
    saveProductButton:Locator;
    deleteProductButton:Locator;
    descriptionInput:Locator;
    stockInput:Locator
    categoryInput:Locator;
    CreationSuccessMessage:Locator;
    productName:Locator;
    ProductPrice:Locator;
    savechangesButton:Locator;

    constructor(page:Page){
        this.page=page
        this.sidebarlink=page.getByRole('link',{name:'Products'});
        this.createProductButton=page.getByTestId('create-product-button');
        this.nameInput=page.getByLabel('Name');
        this.priceInput=page.getByLabel('Price');
        this.statusSelect=page.getByLabel('Status');
        this.saveProductButton=page.getByRole('button',{name:'Save product'});
        this.deleteProductButton=page.getByRole('button',{name:'Delete product'});
        this.descriptionInput=page.getByLabel('Description');
        this.stockInput=page.getByLabel('Stock');
        this.categoryInput=page.getByLabel('Category');
        this.CreationSuccessMessage=page.getByText('Created');
        this.productName=page.getByRole('heading');
        this.ProductPrice=page.getByLabel('Price');
        this.savechangesButton=page.getByRole('button',{name:'Save changes'});
    }


    async createProduct(name:string,price:string,status:string){
        await this.page.goto('/products');
        await this.sidebarlink.click();
        await this.createProductButton.click();
        await this.nameInput.fill(name);
        await this.priceInput.fill(price);
        await this.statusSelect.selectOption(status);
    }
    

    async modifyProduct(name:string,price:string,status:string){
        await this.nameInput.fill(name);
        await this.priceInput.fill(price);
        await this.statusSelect.selectOption(status);
        await this.savechangesButton.click();

    }

    async deleteProduct(){
    await expect(this.deleteProductButton).toBeEnabled();
    await this.deleteProductButton.click();
    await expect(this.productName).not.toHaveText('Mac13');
    }
}   