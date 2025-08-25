// import { test as setup, expect  } from '@playwright/test';

////

// import { test, expect } from '@playwright/test';
// import path from 'path';

// const authFile = path.join(__dirname, '../playwright/.auth/user.json');

// import { LoginPage } from '../Pages/loginPage';


// const user = {
//   name: 'Jane Doe',
//   email: 'customer@practicesoftwaretesting.com',
//   password: 'welcome01'
// }

// // setup('authenticate', async ({ page }) => {
// test('authenticate', async ({ page }) => {

//    test.skip(!!process.env.GITHUB_ACTIONS, 'Skip it in GitHub Actions');

//   const loginPage = new LoginPage(page);
//   await page.goto('/auth/login');
//   // await page.waitForTimeout(2500);


//   await page.locator('input[data-test="email"]').fill(user.email);
//   // await loginPage.enterEmail(user.email);
//   await loginPage.enterPassword(user.password);
//   await loginPage.clickLoginButton();
  
//   await expect(page).toHaveURL('/account');


//   await page.context().storageState({ path: authFile });

// });



/// I would like save this file. I will try to go through login in classic way 

/// Line below just for git actions

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';

test('login', async ({ page }) => {
  test.skip(!!process.env.GITHUB_ACTIONS, 'Skip it in GitHub Actions');

  const homePage = new HomePage(page);
  await page.goto('');
  await homePage.openProductPage('Combination Pliers');

  await expect(page).toHaveURL(url => url.toString().includes('/product'));
});

