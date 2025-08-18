import BasePage from "./base.page";

export default class CartPage extends BasePage {
  get quantityLocator() {
    return this.page.locator('[data-test="item-quantity"]');
  }

  get nameLocator() {
    return this.page.locator('[data-test="inventory-item-name"]');
  }

  get descLocator() {
    return this.page.locator('[data-test="inventory-item-desc"]');
  }

  get priceLocator() {
    return this.page.locator('[data-test="inventory-item-price"]');
  }

  get cartItems() {
    return this.page.locator('[data-test="inventory-item"]');
  }

  get continueButton() {
    return this.page.locator("#continue");
  }

  get finishButton() {
    return this.page.locator("#finish");
  }

  get continueShoppingButton() {
    return this.page.locator("#continue-shopping");
  }

  get checkoutButton() {
    return this.page.locator(".btn.btn_action.btn_medium.checkout_button");
  }

}
