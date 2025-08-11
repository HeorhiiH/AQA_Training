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
        await this.emailInput.fill(email);
    }

    async enterPassword (password: string) {
         await this.passwordInput.fill(password);
  
    }

    async clickButton(){
        await this.loginButton.click();
    }

}