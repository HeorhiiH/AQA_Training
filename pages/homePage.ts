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

    async switchPaginationPage (number: string) {
        await this.paginationSomePage.getByText(number).click();
    }

    alphabeticAscCheck (arr: string[]): boolean {
        if (arr.length <= 1) {
            return true;
        }
        for (let i = 1; i < arr.length; i++) {
            if (arr[i].toLowerCase() < arr[i - 1].toLowerCase()) {
                return false;
            }
        }
        return true;
    };

    alphabeticDescCheck (arr: string[]): boolean {
        if (arr.length <= 1) {
        return true;
        }
        for (let i = 1; i < arr.length; i++) {
        if (arr[i].toLowerCase() > arr[i - 1].toLowerCase()) {
            return false;
        }
        }
        return true;
    };

    numberAscCheck (arr: number[]): boolean {
    if (arr.length <= 1) {
      return true;
    }
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > arr[i - 1]) {
        return false;
      }
    }
    return true;
   };

    numberDescCheck (arr: number[]): boolean {
        if (arr.length <= 1) {
            return true;
        }
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < arr[i - 1]) {
                return false;
            }
        }
        return true;
    };

    // async responseWaiting (param) {
    //     await this.page.waitForResponse(response =>
    //     response.url().includes(param) &&
    //     response.status() === 200
    //     );
    // } "sort=name,asc"

    async getAllProductPrices(): Promise<number[]> {
    const priceArray = await this.productPrice.allInnerTexts();
    const onlyPriceValueArray: number[] = [];
    for (const price of priceArray) {
      onlyPriceValueArray.push(parseFloat(price.replace('$', '')));
    }
    return onlyPriceValueArray;
    }

    async responseWaiting(param: string): Promise<import('@playwright/test').APIResponse> {
        const response = await this.page.waitForResponse(res =>
        res.url().startsWith("https://api.practicesoftwaretesting.com/products") && // use regexp
        res.url().includes(param) &&
        res.ok()   // statuses 2xx
        );
        return response;
    }

    async goTo () {
    await this.page.goto('/');
    }
    
    async goToRoute (partPath:string) {
    await this.page.goto(partPath);
    }

}