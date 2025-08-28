import { test, expect } from "../fixtures/app";

test("sorting by price asc", async ({ app }) => {
  test.skip(!!process.env.GITHUB_ACTIONS, "Skip it in GitHub Actions");

  await app.homePage.navigateTo();
  await app.homePage.sortProducts("Price (Low - High)");
  await app.homePage.responseWaiting("sort=price,asc");
  const priceArray = await app.homePage.productPrice.allInnerTexts();
  const onlyPriceValueArray: number[] = [];
  for (const price of priceArray) {
    onlyPriceValueArray.push(parseFloat(price.replace("$", "")));
  }
  expect(app.homePage.numberDescCheck(onlyPriceValueArray)).toBeTruthy();
});
