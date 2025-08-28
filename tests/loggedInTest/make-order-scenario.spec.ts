import { loggedInTest as test, expect } from "../../fixtures/loggedInApp";

test("make order scenario", async ({ loggedInApp }) => {
  test.skip(!!process.env.GITHUB_ACTIONS, "Skip it in GitHub Actions");

  await loggedInApp.homePage.navigateTo();

  await loggedInApp.homePage.productPrice.first().waitFor({ state: "visible" });

  const prices: number[] = await loggedInApp.homePage.getAllProductPrices();
  const namesArray = await loggedInApp.homePage.productName.allInnerTexts();
  await loggedInApp.homePage.openProductPage(namesArray[0]);
  await loggedInApp.productCardPage.urlPathChecking(/\product/); 
  await loggedInApp.productCardPage.addToCartButton.click();
  await loggedInApp.cartPage.cartLink.click();
  await loggedInApp.productCardPage.urlPathChecking(/\/checkout/);
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
  await loggedInApp.cartPage.stateField.fill(process.env.CARD_STATE!); 
  await loggedInApp.cartPage.postcodeField.fill(process.env.POST_CODE!); 
  await loggedInApp.cartPage.proceedToCheckout3.click();
  await expect(loggedInApp.cartPage.paymentMethodSelect).toBeVisible();

  await loggedInApp.cartPage.selectPaymentMethod(process.env.PAYMENT_METHOD!); 
  await expect(loggedInApp.cartPage.cardNumberField).toBeVisible();
  await loggedInApp.cartPage.cardNumberField.fill(process.env.CARD_NUMBER!); 

  await loggedInApp.cartPage.expirationDateField.fill(process.env.CARD_EXPIRE!); 

  await loggedInApp.cartPage.cvvField.fill(process.env.CARD_CVV!); 

  await loggedInApp.cartPage.cardHolderNameField.fill(process.env.CARD_HOLDER_NAME!); 

  await loggedInApp.cartPage.confirmButton.click();

  await expect(loggedInApp.cartPage.alertSuccessfulPayment).toBeVisible();
});
