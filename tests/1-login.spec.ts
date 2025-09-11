import { test, expect } from "../fixtures/app";

test(
  "login",
  {
    tag: "@smoke",
  },
  async ({ app }) => {
    test.skip(!!process.env.GITHUB_ACTIONS, "Skip it in GitHub Actions");

    await test.step("Navigate to login page", async () => {
      await app.homePage.navigateTo("/auth/login");
    });

    await test.step("Fill login form", async () => {
      await app.loginPage.enterEmail(process.env.EMAIL!);
      await app.loginPage.enterPassword(process.env.PASSWORD!);
    });

    await test.step("Submit login form", async () => {
      await app.loginPage.clickLoginButton();
    });

    await test.step("Verify successful login", async () => {
      await expect(app.homePage.page).toHaveURL(/\/account/);
      await expect(app.accountPage.pageTitle).toContainText("My account");
      await expect(app.accountPage.userName).toContainText(process.env.NAME!);
    });
  }
);
