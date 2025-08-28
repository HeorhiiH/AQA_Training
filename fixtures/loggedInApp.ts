import { test as base, expect } from "@playwright/test";
import { App } from "../pages/appPages";

type LoggedInAppFixtures = {
  loggedInApp: App;
};

export const loggedInTest = base.extend<LoggedInAppFixtures>({
  loggedInApp: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: "playwright/.auth/user.json",
    });
    const page = await context.newPage();
    const app = new App(page);

    await use(app);

    await context.close();
  },
});

export { expect };
