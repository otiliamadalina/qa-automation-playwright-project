import { BrowserContext, expect, Page } from "@playwright/test";
import BaseActions from "./base.actions";
import strings from "../resources/strings.json";
import InventoryPage from "../pages/inventory.page";
import routes from "../resources/routes.json";

export default class InventoryActions extends BaseActions {
  inventory: InventoryPage;

  constructor(page: Page, context: BrowserContext) {
    super(page, context);
    this.inventory = new InventoryPage(page, context);
  }

  async checkProductHeader() {
    await expect(this.inventory.productHeader).toBeVisible();
    await expect(this.inventory.productHeader).toHaveText(strings.inventoryPage.productHeader);
  }

  async checkMenuButton() {
    await expect(this.inventory.menuButton).toBeVisible();
    await this.inventory.menuButton.click();
  }

  async checkLinkByDataTest(dataTest: string, expectedHref: string) {
    const linkLocator = this.inventory.linkLocator(dataTest);
    await expect(linkLocator).toBeVisible();
    await expect(linkLocator).toHaveAttribute("href", expectedHref);
  }

  async verifyMenuLinks() {
    await this.checkLinkByDataTest(
      routes.inventoryPageLinks.aboutSideBar,
      strings.inventoryPage.inventoryPageAttributes.aboutSideBar
    );

    await this.checkLinkByDataTest(
      routes.inventoryPageLinks.inventorySideBar,
      strings.inventoryPage.inventoryPageAttributes.inventorySideBar
    );

    await this.checkLinkByDataTest(
      routes.inventoryPageLinks.logoutSideBar,
      strings.inventoryPage.inventoryPageAttributes.logoutSideBar
    );

    await this.checkLinkByDataTest(
      routes.inventoryPageLinks.resetSideBar,
      strings.inventoryPage.inventoryPageAttributes.resetSideBar
    );
  }

  async closeMenu() {
    await expect(this.inventory.closeMenuButton).toBeVisible();
    await this.inventory.closeMenuButton.click();
  }

  async verifyProducts() {
    const products = this.inventory.allProducts;
    const count = await products.count();

    for (let i = 0; i < count; i++) {
      const product = products.nth(i);

      await expect(product.locator(this.inventory.productName)).toBeVisible();
      await expect(
        product.locator(this.inventory.productsDetails)
      ).toBeVisible();
      await expect(product.locator(this.inventory.productPrice)).toBeVisible();

      const img = product.locator(this.inventory.productImage);
      await expect(img).toBeVisible();
    }
  }

  async addProductsToCart() {
    const products = this.inventory.allProducts;
    const count = await products.count();

    for (let i = 0; i < count; i++) {
      const product = products.nth(i);
      const addButton = product.locator(this.inventory.addToCartButton);

      await expect(addButton).toHaveText(strings.inventoryPage.addToCart);
      await addButton.click();
      await expect(addButton).toHaveText(strings.inventoryPage.remove);
      await expect(addButton).toHaveClass(/btn_secondary/);
    }
  }

  async goToCart() {
    await expect(this.inventory.cartButton).toBeVisible();
    await this.inventory.cartButton.click();
  }
}
