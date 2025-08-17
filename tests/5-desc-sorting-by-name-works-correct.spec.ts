import { test, expect } from '@playwright/test';
import { HomePage } from '../Pages/homePage';

test('login', async ({ page }) => {
  test.skip(!!process.env.GITHUB_ACTIONS, 'Skip it in GitHub Actions');

  const homePage = new HomePage(page);
  await page.goto('');
  await homePage.sortProducts('Name (Z - A)');
  await page.waitForTimeout(3000);
  const namesArray = await homePage.productName.allInnerTexts();
  const alphabeticDescCheck = function (arr: string[]): boolean {
  if (arr.length <= 1) {
    return true;
  }
  for (let i = 1; i < arr.length; i++) {
    if (arr[i].toLowerCase() > arr[i - 1].toLowerCase()) {
      return false;
    }
  }
  return true;
};
expect(alphabeticDescCheck(namesArray)).toBeTruthy();
  
});