import { test, expect } from "../fixtures/app";

test(
  "add product to cart",
  {
    tag: "@smoke",
  },
  async ({ app }) => {
    test.skip(!!process.env.GITHUB_ACTIONS, "Skip it in GitHub Actions");

    await app.homePage.navigateTo();
    await app.homePage.openProductPage("Slip Joint Pliers");

    await expect(app.homePage.page).toHaveURL(/\/product/);
    await expect(app.productCardPage.productName).toContainText(
      "Slip Joint Pliers"
    );
    await expect(app.productCardPage.productPrice).toContainText("9.17");

    await expect(app.productCardPage.addToCartButton).toBeVisible();
    await expect(app.productCardPage.addToFavoritesButton).toBeVisible();

    await app.productCardPage.addToCartButton.click();
    await expect(app.productCardPage.toastProductInCart).toBeVisible();
    //To add check of the showing time
    await expect(app.cartPage.cartQuantityCounter).toContainText("1");

    await app.cartPage.cartLink.click();
    await expect(app.homePage.page).toHaveURL(/\/checkout/);
    await expect(app.cartPage.cartProductTitle).toContainText(
      "Slip Joint Pliers"
    );
    await expect(app.cartPage.proceedToCheckout).toBeVisible();
  }
);
