import { expect, Locator, Page } from "@playwright/test";
import { HeaderFragment } from "./headerFragment";

export class CartPage {
  page: Page;
  header: HeaderFragment;
  cartQuantityCounter: Locator;
  cartLink: Locator;
  cartProductTitle: Locator;
  proceedToCheckout: Locator;
  cartProductPrice: Locator;
  cartTotalPrice: Locator;
  proceedToCheckout2: Locator;
  stateField: Locator;
  postcodeField: Locator;
  proceedToCheckout3: Locator;
  paymentMethodSelect: Locator;
  cardNumberField: Locator;
  expirationDateField: Locator;
  cvvField: Locator;
  cardHolderNameField: Locator;
  confirmButton: Locator;
  alertSuccessfulPayment: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
    this.cartQuantityCounter = page.getByTestId("cart-quantity");
    this.cartLink = page.getByTestId("nav-cart");
    this.cartProductTitle = page.getByTestId("product-title");
    this.proceedToCheckout = page.getByTestId("proceed-1");
    this.cartProductPrice = page.getByTestId("product-price");
    this.cartTotalPrice = page.getByTestId("cart-total");
    this.proceedToCheckout2 = page.getByTestId("proceed-2");
    this.stateField = page.locator("#state");
    this.postcodeField = page.locator("#postal_code");
    this.proceedToCheckout3 = page.getByTestId("proceed-3");
    this.paymentMethodSelect = page.locator("#payment-method");
    this.cardNumberField = page.locator("#credit_card_number");
    this.expirationDateField = page.locator("#expiration_date");
    this.cvvField = page.locator("#cvv");
    this.cardHolderNameField = page.locator("#card_holder_name");
    this.confirmButton = page.getByTestId("finish");
    this.alertSuccessfulPayment = page.getByTestId("payment-success-message");
  }

  async checkProductPrice(param: number): Promise<void> {
    const priceText = String(param);
    await expect(this.cartProductPrice.getByText(priceText)).toBeVisible();
  }

  async checkTotalPrice(param: number): Promise<void> {
    const priceText = String(param);
    await expect(this.cartTotalPrice).toContainText(priceText);
  }

  async selectPaymentMethod(method: string): Promise<void> {
    await this.paymentMethodSelect.click();
    await this.paymentMethodSelect.selectOption(method);
  }
}
