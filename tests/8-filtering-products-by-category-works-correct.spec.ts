import { test, expect } from "../fixtures/app";
import { PowerTools } from "../enum/homePageEnum";

test.describe("filtering by categories", () => {
  const filters = [
    {
      path: "by_category=01K3HGG36Y6W2BYVWN8KWXSZJZ",
      label: PowerTools.Sander,
    },
  ];

  filters.forEach(({ path, label }) => {
    test(`should filter products by category: ${label}`, async ({ app }) => {
      test.skip(!!process.env.GITHUB_ACTIONS, "Skip in GitHub Actions");

      // answer log
      // Sometimes website change id of the category .... :(
      // Should be created method because page is unavailable here
      // page.on('response', res => {
      //   console.log('➡️ Response:', res.url(), res.status());
      // });

      await app.homePage.navigateTo();
      await app.homePage.checkboxItem.getByText(label).click();
      await app.homePage.responseWaiting(path);
      const namesArray = await app.homePage.productName.allInnerTexts();
      expect(namesArray.every((name) => name.includes(label))).toBeTruthy();
    });
  });
});
