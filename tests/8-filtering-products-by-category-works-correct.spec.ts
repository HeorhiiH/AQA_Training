import { test, expect } from '@playwright/test';
import { HomePage } from '../Pages/homePage';



test('login', async ({ page }) => {
  test.skip(!!process.env.GITHUB_ACTIONS, 'Skip it in GitHub Actions');

  enum HandTools {
  Hammer,
  Hand_Saw ='Hand Saw',
  Wrench = 'Wrench',
  Screwdriver = 'Screwdriver',
  Pliers = 'Pliers',
  Chisels = 'Chisels',
  Measures = 'Measures',
}

enum PowerTools {
    Grinder = 'Grinder',
    Sander = 'Sander',
    Saw = 'Saw',
    Drill = 'Drill',
}

enum Other {
    Tool_Belts = 'Tool Belts',
    Storage_Solutions = 'Storage Solutions',
    Workbench = 'Workbench',
    Safety_Gear = 'Safety Gear',
    Fasteners = 'Fasteners',
}

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