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

    // async responseWaiting (param) {
    //     await this.page.waitForResponse(response =>
    //     response.url().includes(param) &&
    //     response.status() === 200
    //     );
    // } "sort=name,asc"

    async responseWaiting(param: string): Promise<import('@playwright/test').APIResponse> {
        const response = await this.page.waitForResponse(res =>
        res.url().startsWith("https://api.practicesoftwaretesting.com/products") &&
        res.url().includes(param) &&
        res.ok()   // статус 2xx
        );
        return response;
    }

    

}