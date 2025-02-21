import { expect, Locator, chromium, Page } from '@playwright/test';
import { test } from '../test-data/userGaragePage';


test.describe('Garage page with fixture', () => {

    test('Open Garage with logged user', async ({garagePageWithLoggedUser}) => {
        await garagePageWithLoggedUser.createCar('Ford', 'Fiesta', 15000);
        await garagePageWithLoggedUser.verifyCarAdded('Ford', 'Fiesta');
    })
})