import { test, expect } from '@playwright/test';
import getRegistrationPage from '../page-objects/RegistrationPage';

const randomNumber = Math.floor(100 + Math.random() * 900);
let generateEmail = `aqa${randomNumber}nata@gmail.com`;

let registrationPage: ReturnType<typeof getRegistrationPage>; 

test.beforeEach(async ({ page }) => {
  registrationPage = getRegistrationPage(page);
  await page.goto('/');
  await registrationPage.openSignUpForm();
});

test.describe('Registration Form Tests', () => {
  test('Positive Test: Register with valid data', async () => {
    await registrationPage.fillRegistrationForm('John', 'Doe', generateEmail, 'Password123', 'Password123');
    await registrationPage.submitRegistration();
    await expect(registrationPage.page).toHaveURL(`https://qauto.forstudy.space/panel/garage`);
  });

  test('Negative Test: Empty Name field show error message', async () => {
    await registrationPage.page.click('#signupName');
    await registrationPage.page.click('#signupPassword');
    await registrationPage.expectRegistrationError(0, 'Name required');
    await registrationPage.expectBorderColor(0, 'rgb(220, 53, 69)');
    await registrationPage.expectRegisterButtonDisabled();
  });

  test('Negative Test: Empty Last name field show error message', async () => {
    await registrationPage.page.click('#signupLastName');
    await registrationPage.page.click('#signupPassword');
    await registrationPage.expectRegistrationError(0, 'Last name required');
    await registrationPage.expectBorderColor(0, 'rgb(220, 53, 69)');
    await registrationPage.expectRegisterButtonDisabled();
  });

  test('Negative Test: Empty Email field show error message', async () => {
    await registrationPage.page.click('#signupEmail');
    await registrationPage.page.click('#signupPassword');
    await registrationPage.expectRegistrationError(0, 'Email required');
    await registrationPage.expectBorderColor(0, 'rgb(220, 53, 69)');
    await registrationPage.expectRegisterButtonDisabled();
  });

  test('Negative Test: Empty Password field show error message', async () => {
    await registrationPage.page.click('#signupPassword');
    await registrationPage.page.click('#signupEmail');
    await registrationPage.expectRegistrationError(0, 'Password required');
    await registrationPage.expectBorderColor(0, 'rgb(220, 53, 69)');
    await registrationPage.expectRegisterButtonDisabled();
  });

  test('Negative Test: Empty Re-enter password field show error message', async () => {
    await registrationPage.page.click('#signupRepeatPassword');
    await registrationPage.page.click('#signupEmail');
    await registrationPage.expectRegistrationError(0, 'Re-enter password required');
    await registrationPage.expectBorderColor(0, 'rgb(220, 53, 69)');
    await registrationPage.expectRegisterButtonDisabled();
  });

  test('Negative Test: Invalid email format', async () => {
    await registrationPage.page.fill('#signupEmail', 'invalidemail');
    await registrationPage.page.click('#signupPassword');
    await registrationPage.expectRegistrationError(0, 'Email is incorrect');
    await registrationPage.expectBorderColor(0, 'rgb(220, 53, 69)');
    await registrationPage.expectColor(0, 'rgb(220, 53, 69)');
  });

  test('Negative Test: Passwords do not match', async () => {
    await registrationPage.page.fill('#signupPassword', 'Password123');
    await registrationPage.page.fill('#signupRepeatPassword', 'Password321');
    await registrationPage.page.click('#signupEmail');
    await registrationPage.expectRegistrationError(0, 'Passwords do not match');
    await registrationPage.expectBorderColor(0, 'rgb(220, 53, 69)');
    await registrationPage.expectColor(0, 'rgb(220, 53, 69)');
  });

  test('Negative Test: Leading and trailing spaces in name and last name', async ({ page }) => {
    await registrationPage.fillRegistrationForm('   John   ', '   Doe   ', generateEmail, 'Password123', 'Password123');
  
    await registrationPage.expectRegistrationError(0, 'Name is invalid');
    await registrationPage.expectRegistrationError(1, 'Last name is invalid');
    await registrationPage.expectRegisterButtonDisabled();
  });

  test('Negative Test: Duplicate email registration', async () => {
    await registrationPage.fillRegistrationForm('Natali', 'Maksy', generateEmail, 'Password123', 'Password123');
    await registrationPage.submitRegistration();
    await registrationPage.page.locator('#userNavDropdown').click();
    await registrationPage.page.locator('.dropdown-item', { hasText: 'Logout' }).click();

    await registrationPage.openSignUpForm();
    await registrationPage.fillRegistrationForm('Natali', 'Maksy', generateEmail, 'Password123', 'Password123');
    await registrationPage.submitRegistration();

    await expect(registrationPage.page.locator('.ng-touched .alert')).toHaveText('User already exists');
  });
});
