import { test, expect, Locator } from '@playwright/test';
import RegisrationPage from '../../page-objects/RegistrationPage';
import SignInForm from '../../page-objects/SignInForm';
import GaragePage from '../../page-objects/GaragePage';
import HomePage from '../../page-objects/HomePage';


test.describe(('Setup users'), () => {

    let signInForm: SignInForm;
    let homePage: HomePage;
    let garagePage: GaragePage;

    test.beforeEach(async ({ page }) => {

        signInForm = new SignInForm(page);
        homePage = new HomePage(page);
        garagePage = new GaragePage(page);
        
        await homePage.open();
        await homePage.clickSignInButton();
    });

    test('Log in and save state', async ({page}) => {
        
        await homePage.open();
        await homePage.clickSignInButton();
        await signInForm.login('naty.maksymiv+12@gmail.com', 'N04051985m');
        await expect(page).toHaveURL(`https://qauto.forstudy.space/panel/garage`);
        await garagePage.verifyPageIsOpen();
        await page.context().storageState({ path: './test-data/states/userOne.json'});
    })
});