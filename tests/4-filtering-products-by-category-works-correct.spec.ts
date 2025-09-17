import { test, expect } from "../fixtures/app";
import { PowerTools } from "../enum/homePageEnum";

test.skip(!!process.env.GITHUB_ACTIONS, "Skip in GitHub Actions");

test.describe("filtering by categories", () => {
  const filters = [{ label: PowerTools.Sander }];

  filters.forEach(({ label }) => {
    test(
      `should filter products by category: ${label}`,
      { tag: "@regression" },
      async ({ app }) => {
        await test.step("Navigate to home page", async () => {
          await app.homePage.navigateTo();
        });

        await test.step(`Apply filter by category: ${label}`, async () => {
          const page = app.homePage.page;

          const labelLocator = page.locator("label", { hasText: label });

          const checkbox = labelLocator.locator("input[type='checkbox']");

          const categoryId = await checkbox.getAttribute("value");
          console.log("log id", categoryId);

          await Promise.all([
            app.homePage.responseWaiting(`by_category=${categoryId}`),
            labelLocator.click(),
          ]);
        });

        await test.step("Verify filtered products contain category label", async () => {
          const namesArray = await app.homePage.productName.allInnerTexts();
          expect(namesArray.every((name) => name.includes(label))).toBeTruthy();
        });
      }
    );
  });
});
