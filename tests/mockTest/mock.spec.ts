import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/homePage";

test("mock products list", async ({ page }) => {
  test.skip(!!process.env.GITHUB_ACTIONS, "Skip it in GitHub Actions");

  const homePage = new HomePage(page);

  await page.route("*/**/products*", async (route) => {
    const response = await route.fetch();
    const json = await response.json();
    const productObject = json.data[2];

    // console.log('response has', json);

    json.data[0].name = "The product is fake";
    json.data[1].name = "The product is also fake";
    for (let i = 1; i < 12; i++) {
      json.data.push(productObject);
    }

    await route.fulfill({ response, json });
  });

  await page.goto("");

  await expect(
    homePage.productName.getByText("The product is fake")
  ).toBeVisible();
  await expect(
    homePage.productName.getByText("The product is also fake")
  ).toBeVisible();

  const productQuantity = await homePage.productName
    .filter({ visible: true })
    .count();
  console.log(productQuantity);
  expect(productQuantity).toBe(20);
});
