import { Locator, Page } from "@playwright/test";
import { HeaderFragment } from './headerFragment';

export class ProductCardPage {
    page: Page;
    header: HeaderFragment;
    productName: Locator;
    productPrice: Locator; 
    addToCartButton: Locator;
    addToFavoritesButton: Locator;
    toastProductInCart: Locator;

    constructor(page: Page){
        this.page = page;
        this.header = new HeaderFragment(page);
        this.productName = page.getByTestId("product-name");
        this.productPrice = page.getByTestId("unit-price");
        this.addToCartButton = page.getByTestId('add-to-cart');
        this.addToFavoritesButton = page.getByTestId('add-to-favorites');
        this.toastProductInCart = page.locator('#toast-container');
    }
}