import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';


const user = {
  name: 'Jane Doe',
  email: 'customer@practicesoftwaretesting.com',
  password: 'welcome01'
}

// First version of the test
// test('login', async ({ page }) => {
//   await page.goto('https://practicesoftwaretesting.com/auth/login');
//   await page.locator('#email').fill(user.email);
//   await page.locator('#password').fill(user.password);
//   await page.getByTestId('login-submit').click();
//   await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
//   // line 11 i think more reliable
//   // await expect(page.getByText('My account')).toBeVisible();
//   await expect(page.getByTestId("page-title")).toContainText('My account');
//   await expect(page.locator('#menu')).toContainText(user.name);
// });

// Test use page object 
test('login', async ({ page }) => {
  test.skip(!!process.env.GITHUB_ACTIONS, 'Skip it in GitHub Actions');

  const loginPage = new LoginPage(page);
  await page.goto('https://practicesoftwaretesting.com/auth/login');
  await loginPage.enterEmail(user.email);
  await loginPage.enterPassword(user.password);
  await loginPage.clickLoginButton();
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
  await expect(page.getByTestId("page-title")).toContainText('My account');
  await expect(page.locator('#menu')).toContainText(user.name);
});

