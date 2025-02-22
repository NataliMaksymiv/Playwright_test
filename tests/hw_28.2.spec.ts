import { test, expect } from '@playwright/test';
import GaragePage from '../page-objects/GaragePage';
import HomePage from '../page-objects/HomePage';
import SignInForm from '../page-objects/SignInForm';
import SidePanel from '../page-objects/SideMenu';
import ProfilePage from '../page-objects/ProfilePage';
import { customConfig } from '../customConfig';
import { USERS } from '../test-data/creds/users';
import { request } from 'http';

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

    test('Sign in as user [/api/auth/signin]', async ({ request }) => {
        const response = await request.post('/api/auth/signin', {
            data: {
                "email": USERS.mainUser.email,
                "password": USERS.mainUser.password
            }
        });
        const body = await response.json();
        console.log(body);
        expect(body.data.userId).toBeDefined();
        expect(body.status).toBe('ok');
    });
});

test.describe('API verifications with auth', () => {
    async function createCar({request}) {
        const response = await request.post(`api/cars`, {
          data: {
            carBrandId: 1,
            carModelId: 1,
            mileage: 122
          }
        });
        expect(response.status()).toBe(201);
        const responseBody = await response.json();
        return responseBody.data.id;
      }

    test.beforeEach(async ({ request }) => {
        const response = await request.post('/api/auth/signin', {
            data: {
                "email": USERS.mainUser.email,
                "password": USERS.mainUser.password
            }
        });
    });
    test('PUT /cars/1 - should update car details successfully', async ({ request }) => {
        const carId = await createCar({request});
        const response = await request.put(`api/cars/${carId}`, {
          data: {
            carBrandId: 1,
            carModelId: 1,
            mileage: 168223
          }
        });
      
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('status', 'ok');
      });

      test('PUT /cars/99999 - should return 404 for non-existent car', async ({ request }) => {
        const response = await request.put(`api/cars/9999999`, {
          data: {
            carBrandId: 1,
            carModelId: 1,
            mileage: 168223
          }
        });
      
        expect(response.status()).toBe(404);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('message', 'Car not found');
      }); 

      test('PUT /cars/1 - should return 400 for missing required fields', async ({ request }) => {
        const carId = await createCar({request});
        const response = await request.put(`api/cars/${carId}`, {
          data: {
            carBrandId: 1
          }
        });
      
        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('message');
      });

});