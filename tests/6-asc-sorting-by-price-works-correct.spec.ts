import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';

test('sorting by price desc', async ({ page }) => {
  test.skip(!!process.env.GITHUB_ACTIONS, 'Skip it in GitHub Actions');

  const homePage = new HomePage(page);
  await page.goto('');
  await homePage.sortProducts('Price (High - Low)');
  await homePage.responseWaiting("sort=price,desc");
  const priceArray = await homePage.productPrice.allInnerTexts();
  const onlyPriceValueArray: number[] = [];
  for (const price of priceArray ){
    onlyPriceValueArray.push(parseFloat(price.replace('$', '')));
  }

  expect(homePage.numberAscCheck(onlyPriceValueArray)).toBeTruthy();

});