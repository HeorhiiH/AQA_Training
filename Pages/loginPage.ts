import { Locator, Page } from "@playwright/test";
import { HeaderFragment } from './headerFragment';

export class LoginPage {
    page: Page;
    header: HeaderFragment;
    emailInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.header = new HeaderFragment(page);
        this.emailInput =  page.locator('#email');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.getByTestId('login-submit');

    }

    async enterEmail(email: string){
        // Add line because have a problem with setupLogin on CI
        await this.emailInput.waitFor({ state: 'visible', timeout: 10000 });
        await this.emailInput.fill(email);
    }

    async enterPassword (password: string) {
        await this.emailInput.waitFor({ state: 'visible', timeout: 10000 });
         await this.passwordInput.fill(password);
    }

    async clickLoginButton(){
        await this.emailInput.waitFor({ state: 'visible', timeout: 10000 });
        await this.loginButton.click();
    }

}