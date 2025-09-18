import { test as setup, expect, request } from "@playwright/test";
import fs from "fs"; // for works with files

const authFile = "playwright/.auth/user.json";

setup("authenticate via API and verify login", async ({ browser }) => {
  // 1. Делаем API login
  const apiContext = await request.newContext();
  const response = await apiContext.post(
    "https://api.practicesoftwaretesting.com/users/login",
    {
      data: {
        email: process.env.EMAIL!,
        password: process.env.PASSWORD!,
      },
    }
  );

  const body = await response.json();
  // console.log('Full response:', body);

  const token = body.access_token; // field from response
  // console.log('Received token', token);

  // 2. Создаём браузер и сохраняем токен в localStorage
  const page = await browser.newPage();

  await page.goto("https://practicesoftwaretesting.com/"); // use link for context of the storage
  await page.evaluate((token) => {
    // evaluate allow to use function
    localStorage.setItem("auth-token", token); // Kay in storage which has token
  }, token);

  // 3. Save state
  await page.context().storageState({ path: authFile });

  // await browser.close();
});
