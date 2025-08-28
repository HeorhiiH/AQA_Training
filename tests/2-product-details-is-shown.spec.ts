import { test, expect } from "../fixtures/app";

test("check product details", async ({ app }) => {
  test.skip(!!process.env.GITHUB_ACTIONS, "Skip it in GitHub Actions");

  await app.homePage.navigateTo();
  await app.homePage.openProductPage("Combination Pliers");
  await app.productCardPage.urlPathChecking(/\/product/);
  await expect(app.productCardPage.productName).toContainText(
    "Combination Pliers"
  );
  await expect(app.productCardPage.productPrice).toContainText("14.15");
  await expect(app.productCardPage.addToCartButton).toBeVisible();
  await expect(app.productCardPage.addToFavoritesButton).toBeVisible();
});
