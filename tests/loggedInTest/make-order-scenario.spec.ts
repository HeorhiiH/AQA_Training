import { loggedInTest as test, expect } from "../../fixtures/loggedInApp";
import { testData } from "../../testData/testData";

test(
  "make order scenario",
  {
    tag: "@smoke",
  },
  async ({ loggedInApp }) => {
    test.skip(!!process.env.GITHUB_ACTIONS, "Skip it in GitHub Actions");

    await loggedInApp.homePage.navigateTo();

    await loggedInApp.homePage.productPrice
      .first()
      .waitFor({ state: "visible" });

    const prices: number[] = await loggedInApp.homePage.getAllProductPrices();
    const namesArray = await loggedInApp.homePage.productName.allInnerTexts();
    await loggedInApp.homePage.openProductPage(namesArray[0]);
    await expect(loggedInApp.homePage.page).toHaveURL(/\/product/);
    await loggedInApp.productCardPage.addToCartButton.click();
    await loggedInApp.cartPage.cartLink.click();
    await expect(loggedInApp.homePage.page).toHaveURL(/\/checkout/);
    await expect(loggedInApp.cartPage.cartProductTitle).toContainText(
      namesArray[0]
    );

    await loggedInApp.cartPage.checkProductPrice(prices[0]);
    await loggedInApp.cartPage.checkTotalPrice(prices[0]);
    await loggedInApp.cartPage.proceedToCheckout.click();

    await expect(loggedInApp.accountPage.userName).toContainText(
      process.env.NAME!
    );
    await loggedInApp.cartPage.proceedToCheckout2.click();

    await expect(loggedInApp.cartPage.stateField).toBeVisible();
    await loggedInApp.cartPage.stateField.fill(testData.cardState);
    await loggedInApp.cartPage.postcodeField.fill(testData.postCode);
    await loggedInApp.cartPage.proceedToCheckout3.click();
    await expect(loggedInApp.cartPage.paymentMethodSelect).toBeVisible();

    await loggedInApp.cartPage.selectPaymentMethod(testData.paymentMethod);
    await expect(loggedInApp.cartPage.cardNumberField).toBeVisible();
    await loggedInApp.cartPage.cardNumberField.fill(testData.cardNumber);

    await loggedInApp.cartPage.expirationDateField.fill(testData.cardExpire);

    await loggedInApp.cartPage.cvvField.fill(testData.cardCvv);

    await loggedInApp.cartPage.cardHolderNameField.fill(
      testData.cardHolderName
    );

    await loggedInApp.cartPage.confirmButton.click();

    await expect(loggedInApp.cartPage.alertSuccessfulPayment).toBeVisible();
  }
);
