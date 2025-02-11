import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../page-objects/RegistrationPage';

let randomNumber: number = Math.floor(100 + Math.random() * 900);
let generateEmail: string = `aqa${randomNumber}nata@gmail.com`;

test.describe('Registration Form Tests', () => {
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.navigateToSignUp();
  });

  test('Positive Test: Register with valid data', async () => {
    await registrationPage.enterName('John');
    await registrationPage.enterLastName('Doe');
    await registrationPage.enterEmail(generateEmail);
    await registrationPage.enterPassword('Password123');
    await registrationPage.enterRepeatPassword('Password123');
    await registrationPage.submitForm();
    await expect(registrationPage.page).toHaveURL('https://qauto.forstudy.space/panel/garage');
  });

  test('Negative Test: Empty fields show error messages', async () => {
    await registrationPage.enterName('');
    await registrationPage.enterLastName('');
    await registrationPage.enterEmail('');
    await registrationPage.enterPassword('');
    await registrationPage.enterRepeatPassword('');

    expect(await registrationPage.getErrorMessage(0)).toBe('Name required');
    expect(await registrationPage.getErrorMessage(1)).toBe('Last name required');
    expect(await registrationPage.getErrorMessage(2)).toBe('Email required');
    expect(await registrationPage.getErrorMessage(3)).toBe('Password required');
    expect(await registrationPage.getErrorMessage(4)).toBe('Re-enter password required');

    expect(await registrationPage.isRegisterButtonDisabled()).toBeTruthy();
  });

  test('Negative Test: Invalid email format', async () => {
    await registrationPage.enterEmail('invalidemail');
    await registrationPage.enterPassword('Password123');

    expect(await registrationPage.getErrorMessage(0)).toBe('Email is incorrect');
  });

  test('Negative Test: Password does not meet requirements', async () => {
    await registrationPage.enterPassword('pass');
    await registrationPage.enterRepeatPassword('pass');

    expect(await registrationPage.getErrorMessage(0)).toBe(
      'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
    );
  });

  test('Negative Test: Passwords do not match', async () => {
    await registrationPage.enterPassword('Password123');
    await registrationPage.enterRepeatPassword('Password321');

    expect(await registrationPage.getErrorMessage(0)).toBe('Passwords do not match');
  });

  test('Negative Test: Name field contains invalid characters', async () => {
    await registrationPage.enterName('John@123');

    expect(await registrationPage.getErrorMessage(0)).toBe('Name is invalid');
  });

  test('Negative Test: Leading and trailing spaces in name and last name', async () => {
    await registrationPage.enterName('   John   ');
    await registrationPage.enterLastName('   Doe   ');
    await registrationPage.enterEmail(generateEmail);
    await registrationPage.enterPassword('Password123');
    await registrationPage.enterRepeatPassword('Password123');
expect(await registrationPage.getErrorMessage(0)).toBe('Name is invalid');
    expect(await registrationPage.getErrorMessage(1)).toBe('Last name is invalid');
    expect(await registrationPage.isRegisterButtonDisabled()).toBeTruthy();
  });

  test('Negative Test: Duplicate email registration', async () => {
    const duplicateEmail = generateEmail;

    // First registration
    await registrationPage.enterName('Natali');
    await registrationPage.enterLastName('Maksy');
    await registrationPage.enterEmail(duplicateEmail);
    await registrationPage.enterPassword('Password123');
    await registrationPage.enterRepeatPassword('Password123');
    await registrationPage.submitForm();
    await registrationPage.logout();

    // Second registration with the same email
    await registrationPage.navigateToSignUp();
    await registrationPage.enterName('Natali');
    await registrationPage.enterLastName('Maksy');
    await registrationPage.enterEmail(duplicateEmail);
    await registrationPage.enterPassword('Password123');
    await registrationPage.enterRepeatPassword('Password123');
    await registrationPage.submitForm();

    await expect(registrationPage.page.locator('.ng-touched .alert')).toHaveText('User already exists');
  });
});
/*test.describe('My describe', async() => {
  test('My test', async({page}) => {
    await page.goto('/');
    await page.locator('.header_right .btn').click();
    await page.fill('#signinEmail', 'naty.maksymiv+12@gmail.com');
    await page.fill('#signinPassword', 'N04051985m');
    await page.locator('.btn', {hasText: 'Login'}).click();
    await page.locator('#userNavDropdown').click();
    await page.locator('.dropdown-item', {hasText:'Logout'}).click();
  });
  
});*/
