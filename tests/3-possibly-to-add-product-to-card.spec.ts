import { test, expect } from '@playwright/test';
import { HomePage } from '../Pages/homePage';
import { CartPage } from '../Pages/cartPage';
import { ProductCardPage } from '../Pages/productCardPage';

test('login', async ({ page }) => {
  test.skip(!!process.env.GITHUB_ACTIONS, 'Skip it in GitHub Actions');

  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);
  const productCardPage = new ProductCardPage(page);
  await page.goto('');
  await homePage.openProductPage('Slip Joint Pliers');

  await expect(page).toHaveURL(url => url.toString().includes('/product'));
  await expect(productCardPage.productName).toContainText('Slip Joint Pliers');
  await expect(productCardPage.productPrice).toContainText('9.17');

  await expect(productCardPage.addToCartButton).toBeVisible();
  await expect(productCardPage.addToFavoritesButton).toBeVisible();

  await productCardPage.addToCartButton.click();
  await expect(productCardPage.toastProductInCart).toBeVisible();
  //To add check of the showing time 
  await expect(cartPage.cartQuantityCounter).toContainText('1');

  await cartPage.cartLink.click();
  await expect(page).toHaveURL(url => url.toString().includes('/checkout'));
  await expect(cartPage.cartProductTitle).toContainText('Slip Joint Pliers');
  await expect(cartPage.proceedToCheckout).toBeVisible();
});