import { loggedInTest as test, expect } from "../../fixtures/loggedInApp";
import { testData } from "../../testData/testData";

test(
  "make order scenario",
  {
    tag: "@smoke",
  },
  async ({ loggedInApp }) => {
    test.skip(!!process.env.GITHUB_ACTIONS, "Skip it in GitHub Actions");

    await test.step("Navigate to home page", async () => {
      await loggedInApp.homePage.navigateTo();
    });

    await test.step("Check that product price is visible", async () => {
      await loggedInApp.homePage.productPrice.first().waitFor({ state: "visible" });
    });

    const prices: number[] = await loggedInApp.homePage.getAllProductPrices();
    const namesArray = await loggedInApp.homePage.productName.allInnerTexts();

    await test.step("Open product page", async () => {
      await loggedInApp.homePage.openProductPage(namesArray[0]);
      await expect(loggedInApp.homePage.page).toHaveURL(/\/product/);
    });

    await test.step("Add product to cart", async () => {
      await loggedInApp.productCardPage.addToCartButton.click();
      await loggedInApp.cartPage.cartLink.click();
      await expect(loggedInApp.homePage.page).toHaveURL(/\/checkout/);
      await expect(loggedInApp.cartPage.cartProductTitle).toContainText(namesArray[0]);
    });

    await test.step("Verify cart prices", async () => {
      await loggedInApp.cartPage.checkProductPrice(prices[0]);
      await loggedInApp.cartPage.checkTotalPrice(prices[0]);
    });

    await test.step("Proceed to checkout, step 1", async () => {
      await loggedInApp.cartPage.proceedToCheckout.click();
      await expect(loggedInApp.accountPage.userName).toContainText(process.env.NAME!);
    });

    await test.step("Proceed to checkout, step 2", async () => {
      await loggedInApp.cartPage.proceedToCheckout2.click();
      await expect(loggedInApp.cartPage.stateField).toBeVisible();
      await loggedInApp.cartPage.stateField.fill(testData.cardState);
      await loggedInApp.cartPage.postcodeField.fill(testData.postCode);
    });

    await test.step("Proceed to checkout, step 3", async () => {
      await loggedInApp.cartPage.proceedToCheckout3.click();
      await expect(loggedInApp.cartPage.paymentMethodSelect).toBeVisible();
    });

    await test.step("Fill payment details", async () => {
      await loggedInApp.cartPage.selectPaymentMethod(testData.paymentMethod);
      await expect(loggedInApp.cartPage.cardNumberField).toBeVisible();
      await loggedInApp.cartPage.cardNumberField.fill(testData.cardNumber);
      await loggedInApp.cartPage.expirationDateField.fill(testData.cardExpire);
      await loggedInApp.cartPage.cvvField.fill(testData.cardCvv);
      await loggedInApp.cartPage.cardHolderNameField.fill(testData.cardHolderName);
    });

    await test.step("Confirm payment", async () => {
      await loggedInApp.cartPage.confirmButton.click();
      await expect(loggedInApp.cartPage.alertSuccessfulPayment).toBeVisible();
    });
  }
);