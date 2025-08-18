import { BrowserContext, expect, Page } from "@playwright/test";
import LoginPage from "../pages/login.page";
import BaseActions from "./base.actions";
import strings from "../resources/strings.json";

export default class LoginActions extends BaseActions {
  login: LoginPage;

  constructor(page: Page, context: BrowserContext) {
    super(page, context);
    this.login = new LoginPage(page, context);
  }

  async checkLoginFields() {
    await expect(this.login.usernameInput).toBeVisible();
    await expect(this.login.usernameInput).toBeEditable();

    await expect(this.login.passwordInput).toBeVisible();
    await expect(this.login.passwordInput).toBeEditable();
  }

  async completeLoginForm(username: string, password: string) {
    await this.login.usernameInput.fill(username);
    await this.login.passwordInput.fill(password);
  }

  async checkLoginButton() {
    await expect(this.login.loginButton).toBeVisible();
    await expect(this.login.loginButton).toBeEditable();
    await this.login.loginButton.click();
  }

  async errorMessageAsExpected(errorMessage: string) {
    const errorLocator = await this.login.getError;
    await expect(errorLocator).toHaveText(errorMessage);
  }

  async logoIsVisible() {
    await expect(this.login.logo).toBeVisible();
  }

  async acceptedUsernameIsVisible() {
    await expect(
      this.login.h4Locator(strings.loginPage.acceptedUsernames.usernameTitle)
    ).toBeVisible();
  }

  async acceptedPasswordIsVisible() {
    await expect(
      this.login.h4Locator(strings.loginPage.passwordForAllUsersTitle)
    ).toBeVisible();
  }
}
