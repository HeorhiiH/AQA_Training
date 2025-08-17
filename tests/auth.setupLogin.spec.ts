import { test as setup, expect  } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

import { LoginPage } from '../Pages/loginPage';


const user = {
  name: 'Jane Doe',
  email: 'customer@practicesoftwaretesting.com',
  password: 'welcome01'
}

setup('authenticate', async ({ page }) => {


  const loginPage = new LoginPage(page);
  await page.goto('/auth/login');

  await page.locator('#email').waitFor({ state: 'visible', timeout: 2000 });

  await loginPage.enterEmail(user.email);
  await loginPage.enterPassword(user.password);
  await loginPage.clickLoginButton();
  
  await expect(page).toHaveURL('/account');



  await page.context().storageState({ path: authFile });
});