import { Page, Locator, expect } from '@playwright/test';

export default class GaragePage {
    readonly page: Page;
    readonly addCarButton: Locator;
    readonly carBrandDropdown: Locator;
    readonly carModelDropdown: Locator;
    readonly pageHeader: Locator;
    readonly carMileageField: Locator;
    readonly saveCarButton: Locator;
    readonly errorMessage:Locator;
    readonly addFuelExpenseButton:Locator;
    readonly editCarButton:Locator;
    readonly removeCarButton:Locator;
    readonly submitRemoveCarButton: Locator;
    readonly carsList: Locator;


    constructor(page: Page) {
        this.page = page;
        this.addCarButton = page.locator('.panel-page_heading .btn', { hasText: 'Add car'})
        this.carBrandDropdown = page.locator('#addCarBrand')
        this.carModelDropdown = page.locator('#addCarModel');
        this.pageHeader = page.locator('.panel-page .panel-page_heading');
        this.carMileageField = page.locator('#addCarMileage');
        this.saveCarButton = page.locator('.modal-content .btn', { hasText: 'Add' });
        this.errorMessage = page.locator('.invalid-feedback');
        this.addFuelExpenseButton = page.locator('.panel-page_cars .car_add-expense', { hasText: 'Add fuel expense' });
        this.editCarButton = page.locator('.car-list .car-item:nth-child(2) .car_edit .icon');
        this.removeCarButton = page.locator('.btn', { hasText: 'Remove car' });
        this.submitRemoveCarButton = page.locator('.modal-footer .btn', { hasText: 'Remove' });
        this.carsList = page.locator('.panel-page_content .car-list');
    }

    // Methods
    async createCar(brand: string, model: string, mileage: number): Promise<void> {
        await this.addCarButton.click();
        await this.carBrandDropdown.selectOption(brand);
        await this.carModelDropdown.selectOption(model);
        await this.carMileageField.fill(mileage.toString());
        await this.carMileageField.blur(); // To trigger any validation
        await this.saveCarButton.click();
    }

    async clickAddCarButton(): Promise<void> {
        await this.addCarButton.click();
    }

    async selectBrand(brand: string): Promise<void> {
        await this.carBrandDropdown.selectOption(brand);
    }

    async selectModel(model: string): Promise<void> {
        await this.carModelDropdown.selectOption(model);
    }

    async enterMileage(mileage: number): Promise<void> {
        await this.carMileageField.fill(mileage.toString());
        await this.carMileageField.blur();
    }

    async clickSaveButton(): Promise<void> {
        await this.saveCarButton.click();
    }

    async checkErrorMessage(expectedMessage: string): Promise<void> {
        await expect(this.errorMessage).toContainText(expectedMessage);
    }

    async verifyCarAdded(brand: string, model: string): Promise<void> {
        const carItem = this.page.locator(`text=${brand} ${model}`).nth(0);
        await expect(carItem).toBeVisible();
    }

    async clickAddFuelExpenseButton(): Promise<void> {
        await this.addFuelExpenseButton.click();
    }
    async verifyPageIsOpen(){
        await expect (this.pageHeader).toContainText('Garage');
    }
    async deleteAllCars(){
        const cars = await this.carsList.all();
        for(let i=0; i < cars.length; i++) {
              await cars[i].locator('span[class="icon icon-edit"]').nth(0).click();
              await this.page.locator('button[class="btn btn-outline-danger"]').nth(0).click();
              await this.page.locator('button[class="btn btn-danger"]').nth(0).click();
        };
    }
}

// Export a function to create a new instance
export const getGaragePage = (page: Page) => new GaragePage(page);
