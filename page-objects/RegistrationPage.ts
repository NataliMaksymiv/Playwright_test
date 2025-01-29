import { BasePage } from './BasePage';
import { Page, expect } from '@playwright/test';

class RegistrationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async openSignUpForm() {
    await this.click('.hero-descriptor_btn:text("Sign up")');
  }

  async fillRegistrationForm(name: string, lastName: string, email: string, password: string, repeatPassword: string) {
    await this.fillField('#signupName', name);
    await this.fillField('#signupLastName', lastName);
    await this.fillField('#signupEmail', email);
    await this.fillField('#signupPassword', password);
    await this.fillField('#signupRepeatPassword', repeatPassword);
  }

  async submitRegistration() {
    await this.click('.modal-footer .btn');
  }

  async expectRegistrationError(index: number, expectedText: string) {
    await expect(this.page.locator('.invalid-feedback').nth(index)).toHaveText(expectedText);
  }

  async expectBorderColor(index: number, color: string) {
    await expect(this.page.locator('.invalid-feedback').nth(index)).toHaveCSS('border-color', color);
  }

  async expectColor( index: number, color: string) {
    await expect(this.page.locator('.invalid-feedback').nth(index)).toHaveCSS('color', color);
  }

  async expectRegisterButtonDisabled() {
    await this.expectDisabled('.btn:text("Register")');
  }
}

export default (page: Page) => new RegistrationPage(page);

