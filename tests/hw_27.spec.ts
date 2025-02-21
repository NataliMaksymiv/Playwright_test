import{test, expect, Locator} from '@playwright/test';
//import RegisrationPage from '../page-objects/RegistrationPage';
import SignInForm from '../page-objects/SignInForm';
import GaragePage from '../page-objects/GaragePage';
import HomePage from '../page-objects/HomePage';


test.describe(('Garage test with POM'), () => {
       //let registrationPage: RegisrationPage;
       test.use({storageState: './test-data/states/userOne.json' })
       let signInForm: SignInForm;
       let garagePage: GaragePage;
       let homePage: HomePage;

       test.beforeEach(async ({page}) => {

        //registrationPage = new RegisrationPage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);
        homePage = new HomePage(page);

        //await homePage.open();
        //await homePage.clickSignInButton();

       })

       test(' Add Ford Fiesta', async () => {
        await garagePage.createCar('Ford', 'Fiesta', 15000);
        await garagePage.verifyCarAdded('Ford', 'Fiesta');
       });
       

})