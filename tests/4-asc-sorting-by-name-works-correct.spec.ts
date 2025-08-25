import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';

test('sorting by name asc', async ({ page }) => {
  test.skip(!!process.env.GITHUB_ACTIONS, 'Skip it in GitHub Actions');

  const homePage = new HomePage(page);
  await page.goto('');
  await homePage.sortProducts('Name (A - Z)');
  // This is the only method that worked among all I tried.
  // Playwright works too fast, and allInnerTexts gets the array before the list has been sorted.
  // await page.waitForTimeout(3000);
  await homePage.responseWaiting("sort=name,asc")
  const namesArray = await homePage.productName.allInnerTexts();
  expect(homePage.alphabeticAscCheck(namesArray)).toBeTruthy();  
  
});