import { test, expect } from "../fixtures/app";

test(
  "sorting by name asc",
  {
    tag: "@regression",
  },
  async ({ app }) => {
    test.skip(!!process.env.GITHUB_ACTIONS, "Skip it in GitHub Actions");

    await app.homePage.navigateTo();
    await app.homePage.sortProducts("Name (A - Z)");
    await app.homePage.responseWaiting("sort=name,asc");
    const namesArray = await app.homePage.productName.allInnerTexts();
    expect(app.homePage.alphabeticAscCheck(namesArray)).toBeTruthy();
  }
);
