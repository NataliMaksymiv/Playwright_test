import { test, expect } from '@playwright/test';
import { signInForm, initSignInForm  } from '../page-objects/SignInForm';
import { customConfig } from '../customConfig';
//import { Page, Locator } from '@playwright/test';


test.describe('Sign In Form Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    initSignInForm(page); // Initialize the instance with the current `page`  
    await page.goto(customConfig.baseUrl);
    await signInForm.clickSignInButton();
  });

  test('User can log in with valid credentials', async ({ page }) => {

    await signInForm.enterEmail(customConfig.httpCredentials.username);
    await signInForm.focusOut();
    await signInForm.enterPassword(customConfig.httpCredentials.password);
    await signInForm.focusOut();
    await signInForm.clickLogin();
    await signInForm.verifyTargetPage('garage'); 
  });

  test('Error messages appear when trying to submit empty fields', async () => {
    await signInForm.clickEmailField();
    await signInForm.clickPasswordField();
    await signInForm.focusOut();

    await signInForm.expectErrorMessage(0, 'Email required');
    await signInForm.expectErrorMessage(1, 'Password required');
    await signInForm.loginButton.isDisabled();
    //await signInForm.clickLogin(); 

    //await expect(signInForm.emailField).toHaveAttribute('aria-invalid', 'true');
    //await expect(signInForm.passwordField).toHaveAttribute('aria-invalid', 'true');
  });

  test('Error appears for invalid email format', async ({ page }) => {
    await signInForm.enterEmail('invalidEmail');
    await signInForm.focusOut(); 
    //await expect(page.locator('.invalid-feedback')).toHaveText('Invalid email format'); 
    await signInForm.expectErrorMessage(0, 'Email is incorrect');
  });

  test('Error appears for incorrect password', async ({ page }) => {
    await signInForm.enterEmail(customConfig.httpCredentials.username);
    await signInForm.focusOut();
    await signInForm.clickPasswordField();
    await signInForm.clearPasswordField();
    await signInForm.focusOut();
    //await signInForm.clickLogin();

    await signInForm.expectErrorMessage(0, 'Password required');
    await signInForm.loginButton.isDisabled();

    //await expect(page.locator('.alert-danger')).toHaveText('Incorrect email or password'); 
  });

  test('Error appears for unregistered email', async ({ page }) => {

    await signInForm.enterEmail('notregistered@example.com');
    await signInForm.focusOut();
    await signInForm.enterPassword('SomePassword123');
    await signInForm.focusOut();
    await signInForm.clickLogin();

    await signInForm.expectAlertMessage('Wrong email or password');
  });

});
