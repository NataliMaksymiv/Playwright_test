import { Page, Locator, expect } from '@playwright/test';

export default class ProfilePage {
    readonly page: Page;
    readonly profileName: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.profileName = page.locator('p[class="profile_name display-4"]')
        
    }

    async verifyProfileName(expectedName: string): Promise<void> {
        await this.page.locator('.profile_name.display-4').waitFor(); // Ensure element is present
        await expect(this.page.locator('.profile_name.display-4')).toHaveText(expectedName);
    }
}