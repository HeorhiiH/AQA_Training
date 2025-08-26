import { loggedInTest as test, expect }  from '../../fixtures/loggedInApp';


test('add product to cart', async ({ loggedInApp }) => {
  test.skip(!!process.env.GITHUB_ACTIONS, 'Skip it in GitHub Actions');

  await loggedInApp.homePage.goTo();

  await loggedInApp.homePage.productPrice.first().waitFor({ state: 'visible' });

  const prices: number[] = await loggedInApp.homePage.getAllProductPrices();
  const namesArray = await loggedInApp.homePage.productName.allInnerTexts();
  await loggedInApp.homePage.openProductPage(namesArray[0]);
  await loggedInApp.productCardPage.urlPathChecking('/product'); // use regexp
  await loggedInApp.productCardPage.addToCartButton.click();
  await loggedInApp.cartPage.cartLink.click();
  await loggedInApp.productCardPage.urlPathChecking('/checkout');
  await expect(loggedInApp.cartPage.cartProductTitle).toContainText(namesArray[0]);

  await loggedInApp.cartPage.checkProductPrice(prices[0]);
  await loggedInApp.cartPage.checkTotalPrice(prices[0]);
  await loggedInApp.cartPage.proceedToCheckout.click();
  
  await expect(loggedInApp.accountPage.userName).toContainText('Jane Doe');
  await loggedInApp.cartPage.proceedToCheckout2.click();

  await expect(loggedInApp.cartPage.stateField).toBeVisible();
  await loggedInApp.cartPage.stateField.fill('Vienna');
  await loggedInApp.cartPage.postcodeField.fill('87517');
  await loggedInApp.cartPage.proceedToCheckout3.click();
  await expect(loggedInApp.cartPage.paymentMethodSelect).toBeVisible();

  await loggedInApp.cartPage.selectPaymentMethod('Credit Card');
  await expect(loggedInApp.cartPage.cardNumberField).toBeVisible();
  await loggedInApp.cartPage.cardNumberField.fill('1111-1111-1111-1111');

  await loggedInApp.cartPage.expirationDateField.fill('11/2025');

  await loggedInApp.cartPage.cvvField.fill('111');

  await loggedInApp.cartPage.cardHolderNameField.fill('Gorg');

  await loggedInApp.cartPage.confirmButton.click();

  await expect(loggedInApp.cartPage.alertSuccessfulPayment).toBeVisible();

});