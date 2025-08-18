import { test as setup, expect, request } from '@playwright/test';
import fs from 'fs';

const authFile = 'playwright/.auth/user.json';

setup('authenticate via API and verify login', async ({ browser }) => {
  // 1. Делаем API login
  const apiContext = await request.newContext();
  const response = await apiContext.post('https://api.practicesoftwaretesting.com/users/login', {
    data: {
      email: 'customer@practicesoftwaretesting.com',
      password: 'welcome01',
    },
  });

  const body = await response.json();
  console.log('📦 Full response:', body);

  const token = body.access_token; // <-- правильное поле
  console.log('✅ Получен токен:', token);

  // 2. Создаём браузер и сохраняем токен в localStorage
  const page = await browser.newPage();

  await page.goto('https://practicesoftwaretesting.com/');
  await page.evaluate((token) => {
    localStorage.setItem('auth-token', token); // ⚠️ используем правильный ключ!
  }, token);

  // 3. Сохраняем state
  await page.context().storageState({ path: authFile });

  // 4. Проверяем, что авторизация реально сработала
  await page.goto('https://practicesoftwaretesting.com/account');
  await expect(page.getByTestId('page-title')).toContainText('My account');

  await browser.close();
});