import { Locator, Page } from "@playwright/test";
import { HeaderFragment } from './headerFragment';

export class HomePage {
    page: Page;
    header: HeaderFragment;
    productLink: Locator;
    productName: Locator;
    productPrice: Locator
    paginationPreviousPage: Locator;
    paginationNextPage: Locator;
    paginationSomePage: Locator;
    checkboxItem: Locator;
    sortSelect: Locator;
    searchInput: Locator;
    clearSearchButton: Locator;
    searchButton: Locator;
    priceRangeMin: Locator;
    priceRangeMax: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.header = new HeaderFragment(page);
        this.productLink = page.locator('a.card');
        this.productName = page.getByTestId('product-name');
        this.productPrice = page.getByTestId('product-price');
        this.paginationPreviousPage = page.locator('a[aria-label="Previous"]');
        this.paginationNextPage = page.locator('a[aria-label="Next"]');
        this.paginationSomePage = page.locator('a.page-link');
        this.checkboxItem = page.locator('label');
        // this.checkboxItem = page.locator('input[type="checkbox"]');
        this.sortSelect = page.getByTestId('sort');
        this.searchInput = page.getByTestId('search-query');
        this.clearSearchButton = page.getByTestId('search-reset');
        this.searchButton = page.getByTestId('search-submit');
        this.priceRangeMin = page.locator('span.ngx-slider-span.ngx-slider-pointer.ngx-slider-pointer-min');
        this.priceRangeMax = page.locator('ngx-slider-span.ngx-slider-pointer.ngx-slider-pointer-max');
    }

    async openProductPage(product: string){
        await this.productLink.getByText(product).click();
    }

    async filter(param: string){
        await this.checkboxItem.getByText(param).click();
    }

    async searchQuery (query: string){
        await this.searchInput.fill(query);
        await this.searchButton.click();
    }

    async clearSearchQuery (query: string){
        await this.searchInput.fill(query);
        await this.clearSearchButton.click();
    }

    async sortProducts (order: string){
        await this.sortSelect.click();
        await this.sortSelect.selectOption(order);
    }

    async somePage (number: string) {
        await this.paginationSomePage.getByText(number).click();
    }

}

export enum HandTools {
  Hammer,
  Hand_Saw ='Hand Saw',
  Wrench = 'Wrench',
  Screwdriver = 'Screwdriver',
  Pliers = 'Pliers',
  Chisels = 'Chisels',
  Measures = 'Measures',
}

export enum PowerTools {
    Grinder = 'Grinder',
    Sander = 'Sander',
    Saw = 'Saw',
    Drill = 'Drill',
}

export enum Other {
    Tool_Belts = 'Tool Belts',
    Storage_Solutions = 'Storage Solutions',
    Workbench = 'Workbench',
    Safety_Gear = 'Safety Gear',
    Fasteners = 'Fasteners',
}