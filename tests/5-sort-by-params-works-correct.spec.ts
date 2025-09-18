import { test, expect } from "../fixtures/app";

test.skip(!!process.env.GITHUB_ACTIONS, "Skip it in GitHub Actions");

test.describe("Product sorting", () => {
  const sortParams = [
    {
      sortOrder: "Name (A - Z)",
      query: "sort=name,asc",
      source: "productName",
      order: "asc",
    },
    {
      sortOrder: "Name (Z - A)",
      query: "sort=name,desc",
      source: "productName",
      order: "desc",
    },
    {
      sortOrder: "Price (Low - High)",
      query: "sort=price,asc",
      source: "productPrice",
      order: "asc",
    },
    {
      sortOrder: "Price (High - Low)",
      query: "sort=price,desc",
      source: "productPrice",
      order: "desc",
    },
  ];

  for (const { sortOrder, query, source, order } of sortParams) {
    test(
      `should sort products by ${sortOrder}`,
      { tag: "@regression" },
      async ({ app }) => {

        await test.step("Navigate to home page", async () => {
          await app.homePage.navigateTo();
        });

        await test.step(`Apply sorting: ${sortOrder}`, async () => {
          await app.homePage.sortProducts(sortOrder);
        });

        await test.step(`Wait for response with query: ${query}`, async () => {
          await app.homePage.responseWaiting(query);
        });

        await test.step("Collect product values and verify sorting", async () => {
          const values = await app.homePage[source].allInnerTexts();
          expect(app.homePage.universalSortDirectMethod(values, order)).toBeTruthy();
        });
      }
    );
  }
});
