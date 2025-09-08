import { test, expect } from "../fixtures/app";

// Test use page object
test(
  "login",
  {
    tag: "@smoke",
  },
  async ({ app }) => {
    test.skip(!!process.env.GITHUB_ACTIONS, "Skip it in GitHub Actions");

    await app.homePage.navigateTo("/auth/login");
    await app.loginPage.enterEmail(process.env.EMAIL!);
    await app.loginPage.enterPassword(process.env.PASSWORD!);
    await app.loginPage.clickLoginButton();
    await expect(app.homePage.page).toHaveURL(/\/account/);
    await expect(app.accountPage.pageTitle).toContainText("My account");
    await expect(app.accountPage.userName).toContainText(process.env.NAME!);
  }
);
