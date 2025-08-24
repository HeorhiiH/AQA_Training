import { test, expect } from '@playwright/test';
import { HomePage } from '../Pages/homePage';
import { PowerTools } from '../Enum/homePageEnum';



test('login', async ({ page }) => {
  test.skip(!!process.env.GITHUB_ACTIONS, 'Skip it in GitHub Actions');

  const homePage = new HomePage(page);
  await page.goto('');
  await homePage.checkboxItem.getByText(PowerTools.Sander).click();
  await homePage.responseWaiting('by_category=01K3E6295WEWVWBQ2RT1NTTPE8');
  const namesArray = await homePage.productName.allInnerTexts();
  const checkFilterParam = function (arr: string[]) {
    return arr.every(name => name.includes("Sander"));
  }
  expect(checkFilterParam(namesArray)).toBeTruthy();
});



//Work on local environment but has a problem on CI with enum import
// test.describe('Filtering by categories', () => {

//   const filters = [
//     {
//       path: "by_category=01K3E2MCJEP5TERTNDRP8ZVWPB",
//       label: PowerTools.Sander
//     }
//   ];

//   filters.forEach(({ path, label }) => {

//     test(`should filter products by category: ${label}`, async ({ page }) => {
//       test.skip(!!process.env.GITHUB_ACTIONS, 'Skip in GitHub Actions');

//       // answer log
//       //Sometimes website change id of the category .... :( 
//       // page.on('response', res => {
//       //   console.log('➡️ Response:', res.url(), res.status());
//       // });

//       const homePage = new HomePage(page);

//       await page.goto('');
//       await homePage.checkboxItem.getByText(label).click();

//       await homePage.responseWaiting(path);

//       const namesArray = await homePage.productName.allInnerTexts();

//       expect(namesArray.every(name => name.includes(label))).toBeTruthy();
// });
//   });
// });
