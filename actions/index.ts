import { BrowserContext, Page } from "@playwright/test";
import BaseActions from "../actions/base.actions";
import LoginActions from "./login.actions";
import NavigationSectionActions from "./navigation.actions";
import CommonActions from "./common.actions";
import InventoryActions from "./inventory.actions";
import CartActions from "./cart.actions";
import CheckoutActions from "./checkout.actions";

export default class App {
  base: BaseActions;
  login: LoginActions;
  navigation: NavigationSectionActions;
  common: CommonActions;
  inventory: InventoryActions;
  cart: CartActions;
  checkout: CheckoutActions;

  constructor(page: Page, context: BrowserContext) {
    this.base = new BaseActions(page, context);
    this.login = new LoginActions(page, context);
    this.navigation = new NavigationSectionActions(page, context);
    this.common = new CommonActions(page, context);
    this.inventory = new InventoryActions(page, context);
    this.cart = new CartActions(page, context);
    this.checkout = new CheckoutActions(page, context);
  }
}