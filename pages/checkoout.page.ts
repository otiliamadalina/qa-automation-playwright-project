import BasePage from "./base.page";

export default class CheckoutPage extends BasePage {
  get checkoutTitle() {
    return this.page.locator('[data-test="title"]');
  }

  get firstNameInput() {
    return this.page.locator("#first-name");
  }

  get lastNameInput() {
    return this.page.locator("#last-name");
  }

  get postalCodeInput() {
    return this.page.locator("#postal-code");
  }

  get backToProductsButton() {
    return this.page.locator("#back-to-products");
  }

  get errorMessageBlankFields() {
    return this.page.locator('[data-test="error"]');
  }

  get cancelButton() {
    return this.page.locator("#cancel");
  }
}
