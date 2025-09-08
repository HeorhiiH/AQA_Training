import { test, expect } from "../fixtures/app";

test(
  "sorting by name desc",
  {
    tag: "@regression",
  },
  async ({ app }) => {
    test.skip(!!process.env.GITHUB_ACTIONS, "Skip it in GitHub Actions");

    await app.homePage.navigateTo();
    await app.homePage.sortProducts("Name (Z - A)");
    await app.homePage.responseWaiting("sort=name,desc");
    const namesArray = await app.homePage.productName.allInnerTexts();
    expect(app.homePage.alphabeticDescCheck(namesArray)).toBeTruthy();
  }
);
