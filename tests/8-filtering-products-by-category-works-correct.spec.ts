import { test, expect } from '@playwright/test';
import { HomePage, PowerTools } from '../Pages/homePage';



test('login', async ({ page }) => {
  test.skip(!!process.env.GITHUB_ACTIONS, 'Skip it in GitHub Actions');

  const homePage = new HomePage(page);
  await page.goto('');
  await homePage.checkboxItem.getByText(PowerTools.Sander).click();
  await page.waitForTimeout(3000);
  const namesArray = await homePage.productName.allInnerTexts();
  const checkFilterParam = function (arr: string[]) {
    return arr.every(name => name.includes("Sander"));
  }
  expect(checkFilterParam(namesArray)).toBeTruthy();
});