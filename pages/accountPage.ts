import { Locator, Page } from "@playwright/test";
import { HeaderFragment } from "./headerFragment";

export class AccountPage {
  page: Page;
  header: HeaderFragment;
  favoritesLink: Locator;
  profileLink: Locator;
  invoicesLink: Locator;
  messagesLink: Locator;
  pageTitle: Locator;
  userName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
    this.favoritesLink = page.getByTestId("nav-favorites");
    this.profileLink = page.getByTestId("nav-profile");
    this.invoicesLink = page.getByTestId("nav-invoices");
    this.messagesLink = page.getByTestId("nav-messages");
    this.pageTitle = page.getByTestId("page-title");
    this.userName = page.locator("#menu");
  }
}
