import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';

test('sorting by name desc', async ({ page }) => {
  test.skip(!!process.env.GITHUB_ACTIONS, 'Skip it in GitHub Actions');

  const homePage = new HomePage(page);
  await page.goto('');
  await homePage.sortProducts('Name (Z - A)');
  await homePage.responseWaiting("sort=name,desc")
  const namesArray = await homePage.productName.allInnerTexts();
  expect(homePage.alphabeticDescCheck(namesArray)).toBeTruthy();
  
});