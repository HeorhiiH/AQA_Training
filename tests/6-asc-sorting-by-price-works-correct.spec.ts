import { test, expect } from '../fixtures/app';


test('sorting by price desc', async ({ app }) => {
  test.skip(!!process.env.GITHUB_ACTIONS, 'Skip it in GitHub Actions');

  await app.homePage.goTo();
  await app.homePage.sortProducts('Price (High - Low)');
  await app.homePage.responseWaiting("sort=price,desc");
  const priceArray = await app.homePage.productPrice.allInnerTexts();
  const onlyPriceValueArray: number[] = [];
  for (const price of priceArray ){
    onlyPriceValueArray.push(parseFloat(price.replace('$', '')));
  }
  expect(app.homePage.numberAscCheck(onlyPriceValueArray)).toBeTruthy();
});