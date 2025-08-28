import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/homePage";

test("mock products list", async ({ page }) => {
  test.skip(!!process.env.GITHUB_ACTIONS, "Skip it in GitHub Actions");

  const homePage = new HomePage(page);

  await page.route("*/**/products*", async (route) => {
    const response = await route.fetch();
    const json = await response.json();

    // console.log('response has', json);

    json.data[0].name = "The product is fake";
    json.data[1].name = "The product is also fake";

    await route.fulfill({ response, json });
  });

  await page.goto("");

  await expect(
    homePage.productName.getByText("The product is fake")
  ).toBeVisible();
  await expect(
    homePage.productName.getByText("The product is also fake")
  ).toBeVisible();
});
