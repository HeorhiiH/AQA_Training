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
    test(
      `should filter products by category: ${label}`,
      {
        tag: "@regression",
      },
      async ({ app }) => {
        test.skip(!!process.env.GITHUB_ACTIONS, "Skip in GitHub Actions");

        // answer log
        // Sometimes website change id of the category .... :(
        // Should be created method because page is unavailable here
        // page.on('response', res => {
        //   console.log('➡️ Response:', res.url(), res.status());
        // });

        await test.step("Navigate to home page", async () => {
          await app.homePage.navigateTo();
        });

        await test.step(`Apply filter by category: ${label}`, async () => {
          await app.homePage.checkboxItem.getByText(label).click();
        });

        await test.step(`Wait for response with filter param: ${path}`, async () => {
          await app.homePage.responseWaiting(path);
        });

        await test.step("Verify filtered products contain category label", async () => {
          const namesArray = await app.homePage.productName.allInnerTexts();
          expect(namesArray.every((name) => name.includes(label))).toBeTruthy();
        });
      }
    );
  });
});

