import { test, expect } from '../fixtures/app';


const user = {
  name: 'Jane Doe',
  email: 'customer@practicesoftwaretesting.com',
  password: 'welcome01'
}

// Test use page object 
test('login', async ({ app }) => {
  test.skip(!!process.env.GITHUB_ACTIONS, 'Skip it in GitHub Actions');

  await app.homePage.goToRoute('/auth/login');
  await app.loginPage.enterEmail(user.email);
  await app.loginPage.enterPassword(user.password);
  await app.loginPage.clickLoginButton();
  await app.productCardPage.urlPathChecking('/account');
  await expect(app.accountPage.pageTitle).toContainText('My account');
  await expect(app.accountPage.userName).toContainText(user.name);
});

