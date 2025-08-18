import BasePage from "./base.page";

export default class InventoryPage extends BasePage {
  get productHeader() {
    return this.page.locator('[data-test="title"]');
  }

  get menuButton() {
    return this.page.locator(`#react-burger-menu-btn`);
  }

  linkLocator(dataTest: string) {
    return this.page.locator(`[data-test="${`${dataTest}`}"]`);
  }

  get closeMenuButton() {
    return this.page.locator(`#react-burger-cross-btn`);
  }

  get allProducts() {
    return this.page.locator(".inventory_item");
  }

  get productName() {
    return this.page.locator('[data-test="inventory-item-name"]');
  }

  get productsDetails() {
    return this.page.locator('[data-test="inventory-item-desc"]');
  }

  get productPrice() {
    return this.page.locator('[data-test="inventory-item-price"]');
  }

  get productImage() {
    return this.page.locator('img.inventory_item_img');
  }

  get addToCartButton(){
    return this.page.locator('button');
  }
  
  get cartButton() {
    return this.page.locator('[data-test="shopping-cart-link"]');
  }
}

