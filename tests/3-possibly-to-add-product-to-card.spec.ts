import { test, expect } from "../fixtures/app";

test(
  "add product to cart",
  {
    tag: "@smoke",
  },
  async ({ app }) => {
    test.skip(!!process.env.GITHUB_ACTIONS, "Skip it in GitHub Actions");

    await test.step("Navigate to home page", async () => {
      await app.homePage.navigateTo();
    });

    await test.step("Open product page for 'Slip Joint Pliers'", async () => {
      await app.homePage.openProductPage("Slip Joint Pliers");
    });

    await test.step("Verify product page details", async () => {
      await expect(app.homePage.page).toHaveURL(/\/product/);
      await expect(app.productCardPage.productName).toContainText("Slip Joint Pliers");
      await expect(app.productCardPage.productPrice).toContainText("9.17");
      await expect(app.productCardPage.addToCartButton).toBeVisible();
      await expect(app.productCardPage.addToFavoritesButton).toBeVisible();
    });

    await test.step("Add product to cart", async () => {
      await app.productCardPage.addToCartButton.click();
      await expect(app.productCardPage.toastProductInCart).toBeVisible();
      await expect(app.cartPage.cartQuantityCounter).toContainText("1");
    });

    await test.step("Go to cart and verify contents", async () => {
      await app.cartPage.cartLink.click();
      await expect(app.homePage.page).toHaveURL(/\/checkout/);
      await expect(app.cartPage.cartProductTitle).toContainText("Slip Joint Pliers");
      await expect(app.cartPage.proceedToCheckout).toBeVisible();
    });
  }
);
