import { test as base } from '@playwright/test';
import { Page } from '@playwright/test';
import GaragePage from '../page-objects/GaragePage';
import HomePage from '../page-objects/HomePage';
import SignInForm from '../page-objects/SignInForm';

let page: Page;
let garagePage: GaragePage;
let homePage: HomePage;
let signInForm: SignInForm;

export const test = base.extend({

    garagePageWithLoggedUser: async ({ page }, use) => {

        garagePage = new GaragePage(page);
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);

        await homePage.open();
        await homePage.clickSignInButton();
        await signInForm.login('naty.maksymiv+12@gmail.com', 'N04051985m')

        await use(garagePage);

        await garagePage.deleteAllCars();

    }

})
