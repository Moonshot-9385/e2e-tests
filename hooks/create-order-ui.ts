//it works
import{expect , Page}from'@playwright/test'
import { ordersPage } from '../tests/UI/orders-page.ts';
export async function createOrderUI(page:Page){
const orderspage = new ordersPage(page);
await orderspage.createOrder('All statuses','abc abc');
await orderspage.productSelect.selectOption('xyz'); 
 await orderspage.addItemButton.click();
 await expect(orderspage.addingItemMessage).toBeVisible();
await orderspage.checkoutButton.click();
}