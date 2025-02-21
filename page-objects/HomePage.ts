import { Page, expect, Locator } from '@playwright/test';
//import { Page, Locator } from '@playwright/test';

export default class HomePage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators
    get signInButton(): Locator {
        return this.page.locator('.header_signin');
    }

    // Methods
    async open(): Promise<void> {
        await this.page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
    }

    async clickSignInButton(): Promise<void> {
        await this.signInButton.click();
    }
}

// Export a function to create a new instance
export const getHomePage = (page: Page) => new HomePage(page);
