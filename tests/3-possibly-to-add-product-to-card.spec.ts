import { test, expect } from '@playwright/test';
import { HomePage } from '../Pages/homePage';

test('login', async ({ page }) => {
  test.skip(!!process.env.GITHUB_ACTIONS, 'Skip it in GitHub Actions');

  const homePage = new HomePage(page);
  await page.goto('');
  await homePage.openProductPage('Slip Joint Pliers');

  await expect(page).toHaveURL(url => url.toString().includes('/product'));
  await expect(page.getByTestId("product-name")).toContainText('Slip Joint Pliers');
  await expect(page.getByTestId("unit-price")).toContainText('9.17');

  await expect(page.getByTestId('add-to-cart')).toBeVisible();
  await expect(page.getByTestId('add-to-favorites')).toBeVisible();

  await page.getByTestId('add-to-cart').click();
  await expect(page.locator('#toast-container')).toBeVisible();
  //To add check of the showing time 
  await expect(page.getByTestId('cart-quantity')).toContainText('1');

  await page.getByTestId('nav-cart').click();
  await expect(page).toHaveURL(url => url.toString().includes('/checkout'));
  await expect(page.getByTestId('product-title')).toContainText('Slip Joint Pliers');
  await expect(page.getByTestId('proceed-1')).toBeVisible();
  

});