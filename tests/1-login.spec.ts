import { test, expect } from '@playwright/test';

const user = {
  name: 'Jane Doe',
  email: 'customer@practicesoftwaretesting.com',
  password: 'welcome01'
}

test('login', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/login');
  await page.locator('#email').fill(user.email);
  await page.locator('#password').fill(user.password);
  await page.getByTestId('login-submit').click();
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
  // line 11 i think more reliable
  // await expect(page.getByText('My account')).toBeVisible();
  await expect(page.getByTestId("page-title")).toContainText('My account');
  await expect(page.locator('#menu')).toContainText(user.name);
});