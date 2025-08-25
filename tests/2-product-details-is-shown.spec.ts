import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';

test('check product details', async ({ page }) => {
  test.skip(!!process.env.GITHUB_ACTIONS, 'Skip it in GitHub Actions');

  const homePage = new HomePage(page);
  await page.goto('');
  await homePage.openProductPage('Combination Pliers');

  await expect(page).toHaveURL(url => url.toString().includes('/product'));
  await expect(page.getByTestId("product-name")).toContainText('Combination Pliers');
  await expect(page.getByTestId("unit-price")).toContainText('14.15');
  await expect(page.getByTestId('add-to-cart')).toBeVisible();
  await expect(page.getByTestId('add-to-favorites')).toBeVisible();
});