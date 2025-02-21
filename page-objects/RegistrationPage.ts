//import { BasePage } from './BasePage';
import { Page, expect } from '@playwright/test';

export default class RegistrationPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToSignUp() {
    await this.page.goto('/');
    await this.page.locator('.hero-descriptor_btn', { hasText: 'Sign up' }).click();
  }

  async enterName(name: string) {
    await this.page.fill('#signupName', name);
  }

  async enterLastName(lastName: string) {
    await this.page.fill('#signupLastName', lastName);
  }

  async enterEmail(email: string) {
    await this.page.fill('#signupEmail', email);
  }

  async enterPassword(password: string) {
    await this.page.fill('#signupPassword', password);
  }

  async enterRepeatPassword(repeatPassword: string) {
    await this.page.fill('#signupRepeatPassword', repeatPassword);
  }

  async submitForm() {
    await this.page.click('.modal-footer .btn');
  }

  async isRegisterButtonDisabled() {
    return this.page.locator('.btn', { hasText: 'Register' }).isDisabled();
  }

  async getErrorMessage(index: number) {
    return await this.page.locator('.invalid-feedback').nth(index).innerText();
  }

  async getBorderColor(index: number) {
    return await this.page.locator('.invalid-feedback').nth(index).evaluate((el) => getComputedStyle(el).borderColor);
  }

  async logout() {
    await this.page.locator('#userNavDropdown').click();
    await this.page.locator('.dropdown-item', { hasText: 'Logout' }).click();
  }
}

