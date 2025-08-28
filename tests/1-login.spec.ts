import { test, expect } from "../fixtures/app";

// Test use page object
test("login", async ({ app }) => {
  test.skip(!!process.env.GITHUB_ACTIONS, "Skip it in GitHub Actions");

  await app.homePage.navigateTo("/auth/login");
  await app.loginPage.enterEmail(process.env.EMAIL!);
  await app.loginPage.enterPassword(process.env.PASSWORD!);
  await app.loginPage.clickLoginButton();
  await app.productCardPage.urlPathChecking("/account");
  await expect(app.accountPage.pageTitle).toContainText("My account");
  await expect(app.accountPage.userName).toContainText(process.env.NAME!);
});
