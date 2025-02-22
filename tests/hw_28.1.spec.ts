import { Page, test, expect, Locator, chromium } from '@playwright/test';
import GaragePage from '../page-objects/GaragePage';
import HomePage from '../page-objects/HomePage';
import SignInForm from '../page-objects/SignInForm';
import SidePanel from '../page-objects/SideMenu';
import ProfilePage from '../page-objects/ProfilePage';
import {customConfig} from '../customConfig';

test.describe('Garage test with POM', () => {
    let garagePage: GaragePage;
    let homePage: HomePage;
    let signInForm: SignInForm;
    let sidePanel: SidePanel;
    let profilePage: ProfilePage;

    test.beforeEach(async ({ page }) => {
        garagePage = new GaragePage(page);
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        sidePanel = new SidePanel(page);
        profilePage = new ProfilePage(page);

        await homePage.open();
        await homePage.clickSignInButton();
        await signInForm.login(customConfig.httpCredentials.username, customConfig.httpCredentials.password);
    });

    test('Mock name in the profile', async ({ page }) => {
        // Define the mock BEFORE navigation
        await page.route('**/api/users/profile', async (route) => {
            const responseBody = {
                "status": "ok",
                "data": {
                    "userId": 175244,
                    "photoFilename": "default-user.png",
                    "name": "Angelina",
                    "lastName": "Jolie"
                }
            };
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(responseBody)
            });
        });

        // Navigate to the profile page (so the mock gets used)
        await sidePanel.clickProfileButton();

        // Verify that the name has changed
        await profilePage.verifyProfileName('Angelina Jolie');
    });
});
