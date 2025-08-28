import { Locator, Page, expect } from "@playwright/test";
import { HeaderFragment } from "./headerFragment";

export class ProductCardPage {
  page: Page;
  header: HeaderFragment;
  productName: Locator;
  productPrice: Locator;
  addToCartButton: Locator;
  addToFavoritesButton: Locator;
  toastProductInCart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
    this.productName = page.getByTestId("product-name");
    this.productPrice = page.getByTestId("unit-price");
    this.addToCartButton = page.getByTestId("add-to-cart");
    this.addToFavoritesButton = page.getByTestId("add-to-favorites");
    this.toastProductInCart = page.locator("#toast-container");
  }

  // include method does not work with RegExp
  // async urlPathChecking(path: string): Promise<void> {
  //   await expect(this.page).toHaveURL((url) => url.toString().includes(path));
  // }

  async urlPathChecking(path: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(path);
  }
}
