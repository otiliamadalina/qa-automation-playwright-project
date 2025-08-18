import { BrowserContext, expect, Page } from "@playwright/test";
import BaseActions from "./base.actions";
import CartPage from "../pages/cart.page";

export default class CartActions extends BaseActions {
  cart: CartPage;

  constructor(page: Page, context: BrowserContext) {
    super(page, context);
    this.cart = new CartPage(page, context);
  }



  async verifyCartProducts() {
    const items = this.cart.cartItems;
    const cartCount = await items.count();

    for (let i = 0; i < cartCount; i++) {
      const item = items.nth(i);

      const quantityLocator = item.locator(this.cart.quantityLocator);
      const nameLocator = item.locator(this.cart.nameLocator);
      const descLocator = item.locator(this.cart.descLocator);
      const priceLocator = item.locator(this.cart.priceLocator);

      await expect(quantityLocator).toBeVisible();
      await expect(nameLocator).toBeVisible();
      await expect(descLocator).toBeVisible();
      await expect(priceLocator).toBeVisible();
    }
  }

  async continueCheckoutButton() {
    await expect(this.cart.continueButton).toBeVisible();
    await this.cart.continueButton.click();
  }

  async finishButtonfromCart() {
    await expect(this.cart.finishButton).toBeVisible();
    await this.cart.finishButton.click();
  }

  async continueShoppingButton() {
    await expect(this.cart.continueShoppingButton).toBeVisible();
    await this.cart.continueShoppingButton.click();
  }

    async goToCheckout() {
    await expect(this.cart.checkoutButton).toBeVisible();
    await this.cart.checkoutButton.click();
  }

}
