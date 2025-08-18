import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';


const user = {
  name: 'Jane Doe',
  email: 'customer@practicesoftwaretesting.com',
  password: 'welcome01'
}

// Test use page object 
test('login', async ({ page }) => {
  test.skip(!!process.env.GITHUB_ACTIONS, 'Skip it in GitHub Actions');

  const loginPage = new LoginPage(page);
  await page.goto('/auth/login');
  await loginPage.enterEmail(user.email);
  await loginPage.enterPassword(user.password);
  await loginPage.clickLoginButton();
  await expect(page).toHaveURL('/account');
  await expect(page.getByTestId("page-title")).toContainText('My account');
  await expect(page.locator('#menu')).toContainText(user.name);
});

