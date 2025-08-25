import { Locator, Page } from "@playwright/test";
import { HeaderFragment } from './headerFragment';

export class CartPage {
    page: Page;
    header: HeaderFragment;
    cartQuantityCounter: Locator;
    cartLink: Locator; 
    cartProductTitle: Locator;
    proceedToCheckout: Locator;

    constructor(page: Page){
        this.page = page;
        this.header = new HeaderFragment(page);
        this.cartQuantityCounter = page.getByTestId('cart-quantity');
        this.cartLink = page.getByTestId('nav-cart');
        this.cartProductTitle = page.getByTestId('product-title');
        this.proceedToCheckout = page.getByTestId('proceed-1');
    }
}