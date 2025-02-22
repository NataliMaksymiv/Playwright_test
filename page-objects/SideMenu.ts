import { Page, Locator } from '@playwright/test';

export default class SidePanel {
    readonly page: Page;
    readonly garagePageButton: Locator;
    readonly fuelExpenseButton: Locator;
    readonly instructionsButton: Locator;
    readonly profileButton: Locator;
    readonly settingsButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.garagePageButton = page.locator('.col-3 .sidebar [href="/panel/garage"]');
        this.fuelExpenseButton = page.locator('.col-3 .sidebar [href="/panel/expenses"]');
        this.instructionsButton = page.locator('.col-3 .sidebar [href="/panel/instructions"]');
        this.profileButton = page.locator('.sidebar .sidebar_btn-group', { hasText: 'Profile' });
        this.settingsButton = page.locator('.col-3 .sidebar [href="/panel/settings"]');
    }

    async clickGaragePageButton(): Promise<void> {
        await this.garagePageButton.click();
    }

    async clickFuelExpenseButton(): Promise<void> {
        await this.fuelExpenseButton.click();
    }

    async clickInstructionsButton(): Promise<void> {
        await this.instructionsButton.click();
    }

    async clickProfileButton(): Promise<void> {
        await this.profileButton.click();
    }

    async clickSettingsButton(): Promise<void> {
        await this.settingsButton.click();
    }
}
