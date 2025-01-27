import { test, expect } from '@playwright/test';
import { describe } from 'node:test';


const randomNumber = Math.floor(100 + Math.random() * 900);
let generateEmail = `aqa${randomNumber}nata@gmail.com`;

test.beforeEach('', async ({ page }) => {
  await page.goto('/');
  await page.locator('.hero-descriptor_btn', { hasText: 'Sign up' }).click();
});
test.describe('Registration Form Tests', () => {
  test('Positive Test: Register with valid data', async ({ page }) => {

    // Fill in the registration form
    await page.fill('#signupName', 'John');
    await page.fill('#signupLastName', 'Doe');
    await page.fill('#signupEmail', generateEmail);
    await page.fill('#signupPassword', 'Password123');
    await page.fill('#signupRepeatPassword', 'Password123');
    await page.click('.modal-footer .btn');
    await expect(page).toHaveURL(`https://qauto.forstudy.space/panel/garage`);
  });

  test('Negative Test: Empty fields show error messages', async ({ page }) => {
    await page.locator('#signupName').click();
    await page.click('.modal-body');
    expect(page.locator('.invalid-feedback').nth(0)).toHaveText('Name required');
    expect(
      await page.locator('.invalid-feedback').nth(0).evaluate((el) => getComputedStyle(el).borderColor)
    ).toBe('rgb(220, 53, 69)');
    await page.locator('#signupLastName').click()
    await page.click('.modal-body');
    expect(page.locator('.invalid-feedback').nth(1)).toHaveText('Last name required');
    expect(
      await page.locator('.invalid-feedback').nth(1).evaluate((el) => getComputedStyle(el).borderColor)
    ).toBe('rgb(220, 53, 69)');
    await page.locator('#signupEmail').click();
    await page.click('.modal-body');
    expect(page.locator('.invalid-feedback').nth(2)).toHaveText('Email required');
    expect(
      await page.locator('.invalid-feedback').nth(2).evaluate((el) => getComputedStyle(el).borderColor)
    ).toBe('rgb(220, 53, 69)');
    await page.locator('#signupPassword').click();
    await page.click('.modal-body');
    expect(page.locator('.invalid-feedback').nth(3)).toHaveText('Password required');
    expect(
      await page.locator('.invalid-feedback').nth(3).evaluate((el) => getComputedStyle(el).borderColor)
    ).toBe('rgb(220, 53, 69)');
    await page.locator('#signupRepeatPassword').click();
    await page.click('.modal-body');
    expect(page.locator('.invalid-feedback').nth(4)).toHaveText('Re-enter password required');
    expect(
      await page.locator('.invalid-feedback').nth(4).evaluate((el) => getComputedStyle(el).borderColor)
    ).toBe('rgb(220, 53, 69)');
    expect(page.locator('.btn', { hasText: 'Register' })).toBeDisabled();
  });

  test('Negative Test: Invalid email format', async ({ page }) => {
    await page.locator('#signupEmail').click();
    await page.locator('#signupEmail').fill('invalidemail');
    await page.click('#signupPassword');
    expect(page.locator('.invalid-feedback')).toHaveText('Email is incorrect');
    expect(
      await page.locator('.invalid-feedback').evaluate((el) => getComputedStyle(el).borderColor)
    ).toBe('rgb(220, 53, 69)');
    expect(
      await page.locator('.invalid-feedback').evaluate((el) => getComputedStyle(el).color)
    ).toBe('rgb(220, 53, 69)');
  });

  test('Negative Test: Password does not meet requirements', async ({ page }) => {
    await page.fill('#signupPassword', 'pass');
    await page.fill('#signupRepeatPassword', 'pass');
    await page.click('#signupEmail');
    expect(page.locator('.invalid-feedback').nth(0)).toHaveText(
      'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
    );
    expect(
      await page.locator('.invalid-feedback').nth(0).evaluate((el) => getComputedStyle(el).borderColor)
    ).toBe('rgb(220, 53, 69)');
    expect(
      await page.locator('.invalid-feedback').nth(0).evaluate((el) => getComputedStyle(el).color)
    ).toBe('rgb(220, 53, 69)');
    expect(page.locator('.invalid-feedback').nth(1)).toHaveText(
      'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
    );
    expect(
      await page.locator('.invalid-feedback').nth(1).evaluate((el) => getComputedStyle(el).borderColor)
    ).toBe('rgb(220, 53, 69)');
    expect(
      await page.locator('.invalid-feedback').nth(1).evaluate((el) => getComputedStyle(el).color)
    ).toBe('rgb(220, 53, 69)');
  });

  test('Negative Test: Passwords do not match', async ({ page }) => {
    await page.fill('#signupPassword', 'Password123');
    await page.fill('#signupRepeatPassword', 'Password321');
    await page.click('#signupEmail');
    expect(page.locator('.invalid-feedback')).toHaveText('Passwords do not match');
    expect(
      await page.locator('.invalid-feedback').evaluate((el) => getComputedStyle(el).borderColor)
    ).toBe('rgb(220, 53, 69)');
    expect(
      await page.locator('.invalid-feedback').nth(0).evaluate((el) => getComputedStyle(el).color)
    ).toBe('rgb(220, 53, 69)');
  });

  test('Negative Test: Name field contains invalid characters', async ({ page }) => {
    await page.fill('#signupName', 'John@123');
    await page.click('.modal-body');
    expect(page.locator('.invalid-feedback')).toHaveText('Name is invalid');
    expect(
      await page.locator('.invalid-feedback').evaluate((el) => getComputedStyle(el).borderColor)
    ).toBe('rgb(220, 53, 69)');
    expect(
      await page.locator('.invalid-feedback').nth(0).evaluate((el) => getComputedStyle(el).color)
    ).toBe('rgb(220, 53, 69)');
  });

  test('Negative Test: Leading and trailing spaces in name and last name', async ({ page }) => {
    await page.fill('#signupName', '   John   ');
    await page.fill('#signupLastName', '   Doe   ');
    await page.fill('#signupEmail', generateEmail);
    await page.fill('#signupPassword', 'Password123');
    await page.fill('#signupRepeatPassword', 'Password123');
    expect(page.locator('.invalid-feedback').nth(0)).toHaveText('Name is invalid');
    expect(page.locator('.invalid-feedback').nth(1)).toHaveText('Last name is invalid');
    expect(page.locator('.btn', { hasText: 'Register' })).toBeDisabled();
  });


});
test.describe('Duplicate user', () => {
  test('Negative Test: Duplicate email registration', async ({ page }) => {
    let duplicateEmail = generateEmail;

    // First registration
    await page.fill('#signupName', 'Natali');
    await page.fill('#signupLastName', 'Maksy');
    await page.fill('#signupEmail', generateEmail);
    await page.fill('#signupPassword', 'Password123');
    await page.fill('#signupRepeatPassword', 'Password123');
    await page.click('.modal-footer .btn');
    await page.locator('#userNavDropdown').click();
    await page.locator('.dropdown-item', { hasText: 'Logout' }).click();
    await page.locator('.hero-descriptor_btn', { hasText: 'Sign up' }).click();
    // Second registration with the same email
    await page.fill('#signupName', 'Natali');
    await page.fill('#signupLastName', 'Maksy');
    await page.fill('#signupEmail', duplicateEmail);
    await page.fill('#signupPassword', 'Password123');
    await page.fill('#signupRepeatPassword', 'Password123');
    await page.click('.modal-footer .btn');

    await expect(page.locator('.ng-touched .alert')).toHaveText('User already exists');
  });
})
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
