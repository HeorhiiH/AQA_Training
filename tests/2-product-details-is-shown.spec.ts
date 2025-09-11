import { test, expect } from "../fixtures/app";

test(
  "check product details",
  {
    tag: "@regression",
  },
  async ({ app }) => {
    test.skip(!!process.env.GITHUB_ACTIONS, "Skip it in GitHub Actions");

    await test.step("Navigate to home page", async () => {
      await app.homePage.navigateTo();
    });

    await test.step("Open product page for 'Combination Pliers'", async () => {
      await app.homePage.openProductPage("Combination Pliers");
    });

    await test.step("Verify product details", async () => {
      await expect(app.homePage.page).toHaveURL(/\/product/);
      await expect(app.productCardPage.productName).toContainText("Combination Pliers");
      await expect(app.productCardPage.productPrice).toContainText("14.15");
      await expect(app.productCardPage.addToCartButton).toBeVisible();
      await expect(app.productCardPage.addToFavoritesButton).toBeVisible();
    });
  }
);
