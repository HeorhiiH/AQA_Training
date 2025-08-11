import { Locator, Page } from "@playwright/test";

export class HeaderFragment {
    page: Page;
    logoLink: Locator;
    homeLink: Locator;
    categoriesLink: Locator;
    contactLink: Locator;
    languagesSelectLink: Locator;
    categoriesLanguagesDropdownItem: Locator;
    signInLink: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.logoLink = page.locator('a.navbar-brand');
        this.homeLink = page.getByTestId('nav-home');
        this.categoriesLink = page.getByTestId('nav-categories');
        this.contactLink = page.getByTestId('nav-contact');
        this.languagesSelectLink = page.getByTestId('language-select');
        this.categoriesLanguagesDropdownItem = page.locator('a.dropdown-item');
        this.signInLink = page.locator('nav-sign-in');
    }

    async goToHomePageByLogo(){
        await this.logoLink.click();
    }

    async goToHomePageByButton(){
        await this.homeLink.click();
    }

    async openCategoriesList(){
        await this.categoriesLink.click();
    }

    async chooseCategories(categories: string){
        await this.categoriesLink.click();
        await this.categoriesLanguagesDropdownItem.getByText(categories).click();
    }

    async openLanguagesList(){
        await this.languagesSelectLink.click();
    }

    async chooseLanguages(leng: string){
        await this.languagesSelectLink.click();
        await this.categoriesLanguagesDropdownItem.getByText(leng).click();
    }

    async goToHomeContactPage(){
        await this.contactLink.click();
    }

    async goToSignInPage(){
        await this.signInLink.click();
    }

}
