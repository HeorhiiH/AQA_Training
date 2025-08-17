import { test, expect } from '@playwright/test';
import { HomePage } from '../Pages/homePage';

test('login', async ({ page }) => {
  test.skip(!!process.env.GITHUB_ACTIONS, 'Skip it in GitHub Actions');

  const homePage = new HomePage(page);
  await page.goto('');
  await homePage.sortProducts('Price (Low - High)');
  await page.waitForTimeout(3000);
  const priceArray = await homePage.productPrice.allInnerTexts();
  const onlyPriceValueArray: number[] = [];
  for (const price of priceArray ){
    onlyPriceValueArray.push(parseFloat(price.replace('$', '')));
  }
  const numberDescCheck = function (arr: number[]): boolean {
  if (arr.length <= 1) {
    return true;
  }
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      return false;
    }
  }
  return true;
};
expect(numberDescCheck(onlyPriceValueArray)).toBeTruthy();
});