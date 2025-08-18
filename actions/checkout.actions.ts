import { BrowserContext, expect, Page } from "@playwright/test";
import BaseActions from "./base.actions";
import strings from "../resources/strings.json";
import CheckoutPage from "../pages/checkoout.page";

export default class CheckoutActions extends BaseActions {
  checkout: CheckoutPage;

  constructor(page: Page, context: BrowserContext) {
    super(page, context);
    this.checkout = new CheckoutPage(page, context);
  }

  async inputCheckoutCredentials() {
    await expect(this.checkout.checkoutTitle).toBeVisible();
    await expect(this.checkout.checkoutTitle).toHaveText(strings.checkoutTitle);
    await this.checkout.firstNameInput.fill(
      strings.sauceCheckoutCredentials.firstName
    );
    await this.checkout.lastNameInput.fill(
      strings.sauceCheckoutCredentials.lastName
    );
    await this.checkout.postalCodeInput.fill(
      strings.sauceCheckoutCredentials.postalCode
    );
  }

  async backToProductsButton() {
    await expect(this.checkout.backToProductsButton).toBeVisible();
    await this.checkout.backToProductsButton.click();
  }

  async errorBlankFields() {
    await expect(this.checkout.errorMessageBlankFields).toBeVisible();
    await expect(this.checkout.errorMessageBlankFields).toHaveText(
      strings.errorBlankFields
    );
  }

  async cancelButton() {
    await expect(this.checkout.cancelButton).toBeVisible();
    await this.checkout.cancelButton.click();
  }
}
