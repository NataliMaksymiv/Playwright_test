import { Page, test, expect, Locator, chromium } from '@playwright/test';
import GaragePage from '../page-objects/GaragePage';
import HomePage from '../page-objects/HomePage';


test.describe(('Garage test with POM'), () => {
    let page: Page;
    let garagePage: GaragePage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        const browser = await chromium.launch();
        const context = await browser.newContext({
            storageState: './test-data/states/userOne.json'
        })
        page = await context.newPage();
        garagePage = new GaragePage(page);
        homePage = new HomePage(page);
        await homePage.open();
        //await homePage.clickSignInButton();

    })

    test(' Add Ford Fiesta', async () => {
        await garagePage.createCar('Ford', 'Fiesta', 15000);
        await garagePage.verifyCarAdded('Ford', 'Fiesta');
    });
});
test.describe(('Garage page for guest'), () => {
    let page: Page;
    let garagePage: GaragePage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        garagePage = new GaragePage(page);
        homePage = new HomePage(page);
        await homePage.open();

        await page.getByText('Guest log in').click();
        await expect(page.locator('.panel-page .panel-page_heading')).toBeVisible();

    })

    test(' Add Ford Fiesta', async ({ page }) => {

        await garagePage.createCar('BMW', 'X6', 3000);
        await garagePage.verifyCarAdded('BMW', 'X6');
       const parsedData = await page.evaluate(async () => {
             return window.sessionStorage.getItem('guestData') ?? '';
        })
        console.log(parsedData);
        const parsedDataObj = JSON.parse(parsedData);
        expect(parsedDataObj.cars[0].id).toBe(1)
        //await page.waitForTimeout(50000);


    });


})