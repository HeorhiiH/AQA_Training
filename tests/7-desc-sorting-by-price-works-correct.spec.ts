import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';

test('sorting by price asc', async ({ page }) => {
  test.skip(!!process.env.GITHUB_ACTIONS, 'Skip it in GitHub Actions');

  const homePage = new HomePage(page);
  await page.goto('');
  await homePage.sortProducts('Price (Low - High)');
  await homePage.responseWaiting("sort=price,asc");
  const priceArray = await homePage.productPrice.allInnerTexts();
  const onlyPriceValueArray: number[] = [];
  for (const price of priceArray ){
    onlyPriceValueArray.push(parseFloat(price.replace('$', '')));
  }

  expect(homePage.numberDescCheck(onlyPriceValueArray)).toBeTruthy();

});