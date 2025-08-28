import { Page } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { HomePage } from "../pages/homePage";
import { CartPage } from "../pages/cartPage";
import { ProductCardPage } from "../pages/productCardPage";
import { AccountPage } from "../pages/accountPage";

export class App {
  readonly loginPage: LoginPage;
  readonly homePage: HomePage;
  readonly cartPage: CartPage;
  readonly productCardPage: ProductCardPage;
  readonly accountPage: AccountPage;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
    this.homePage = new HomePage(page);
    this.cartPage = new CartPage(page);
    this.productCardPage = new ProductCardPage(page);
    this.accountPage = new AccountPage(page);
  }
}
