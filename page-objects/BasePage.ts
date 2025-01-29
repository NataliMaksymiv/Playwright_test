import { Page, expect } from '@playwright/test';

export class BasePage {
  public page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async click(selector: string) {
    await this.page.locator(selector).click();
  }

  async fillField(selector: string, value: string) {
    await this.page.fill(selector, value);
  }

  async expectText(selector: string, expectedText: string) {
    await expect(this.page.locator(selector)).toHaveText(expectedText);
  }

  async expectDisabled(selector: string) {
    await expect(this.page.locator(selector)).toBeDisabled();
  }
}


