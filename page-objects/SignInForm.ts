import { Page, Locator, expect } from '@playwright/test';

export class SignInForm {
  readonly page: Page;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly signInButton: Locator;
  private errorMessage: Locator;
  private alertMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailField = page.locator('#signinEmail');
    this.passwordField = page.locator('#signinPassword');
    this.loginButton = page.locator('.btn', { hasText: 'Login' });
    this.signInButton = page.locator('.header_right .btn');
    this.errorMessage = page.locator('.invalid-feedback');
    this.alertMessage = page.locator('.ng-dirty .alert');
  }
  async clickSignInButton() {
    await this.signInButton.click();
  }
  async clearEmailField() {
    await this.emailField.click();
    await this.emailField.clear();
  }
  async clearPasswordField() {
    await this.passwordField.click();
    await this.passwordField.clear();
  }
  async clickEmailField() {
    await this.emailField.click();
  }
  async enterEmail(email: string) {
    await this.emailField.click();
    await this.emailField.fill(email);
  }
  async clickPasswordField() {
    await this.passwordField.click();
  }
  async enterPassword(password: string) {
    await this.passwordField.click();
    await this.passwordField.fill(password);
  }
  async focusOut() {
    await this.page.click('body');
  }
  async clickLogin() {
    await this.loginButton.click();
  }
  async login(email: string, password: string) {
    await this.emailField.click();
    await this.enterEmail(email);
    await this.focusOut(); 
    await this.passwordField.click();
    await this.enterPassword(password);
    await this.focusOut();
    await this.clickLogin();
  }
  async expectErrorMessage(index: number, expectedText: string) {
    await expect(this.page.locator('.invalid-feedback').nth(index)).toHaveText(expectedText);
  }
  async expectAlertMessage(expectedText: string) {
    await expect(this.page.locator('.ng-dirty .alert')).toHaveText(expectedText);
  }
  async verifyTargetPage(pageName: string){
    await expect(this.page).toHaveURL('https://qauto.forstudy.space/panel/'+ pageName)
  }
}

export let signInForm: SignInForm;
export function initSignInForm(page: Page) {
  signInForm = new SignInForm(page);
}
