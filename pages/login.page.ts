import BasePage from "./base.page";

export default class LoginPage extends BasePage {
  get usernameInput() {
    return this.page.getByRole("textbox", { name: "Username" });
  }

  get passwordInput() {
    return this.page.getByRole("textbox", { name: "Password" });
  }

  get loginButton() {
    return this.page.getByRole("button", { name: "Login" });
  }

  get getError() {
    return this.page.locator("[data-test='error']");
  }

  get logo() {
    return this.page.locator("text=Swag Labs");
  }

  h4Locator(usernameTitle: string) {
    return this.page.locator("h4", { hasText: `${usernameTitle}` });
  }
}
