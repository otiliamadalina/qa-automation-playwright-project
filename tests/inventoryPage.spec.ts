import routes from "../resources/routes.json";
import strings from "../resources/strings.json";
import { And, Given, Then, When } from "../utils/adnotations";
import test from "./test";

test.beforeEach(async ({ app }) => {
  Given("the user accesses the Login Page");
  await test.step("Access Login Page", async () => {
    console.log("Access login page.");
    await app.base.navigateTo(routes.loginPage);
    await app.navigation.pageUrlAsExpected(routes.loginPage);
    await app.common.browserTabTitleAsExpected(strings.loginPage.pageTitle);
    await app.login.logoIsVisible();
  });

  Then("the user completes login form and moves forward");
  await test.step("Login", async () => {
    console.log("Login.");
    await app.login.checkLoginFields();
    await app.login.completeLoginForm(
      strings.loginPage.acceptedUsernames.standardUser,
      strings.loginPage.passwordForAllUsers
    );
    await app.login.checkLoginButton();
  });

  Then("the user sees correct inventory URL");
  await test.step("Verify inventory URL", async () => {
    await app.navigation.pageUrlAsExpected(routes.inventoryPage);
  });
});

test.describe("Inventory tests", { tag: ["@inventory", "@regression"] }, () => {
  test("Menu", async ({ app }) => {
    
    When("the user interacts with the menu");
    await test.step("Verify menu", async () => {
      await app.inventory.checkMenuButton();
    });

    And("the menu links are visible and correct");
    await test.step("Verify Menu Links", async () => {
      await app.inventory.verifyMenuLinks();
    });

    And("the user closes the menu");
    await test.step("Close Menu", async () => {
      await app.inventory.closeMenu();
    });
  });

  test("SauceDemo verify Products", async ({ app }) => {

    Given("the user is on the products page");
    await test.step("Products Title", async () => {
      await app.inventory.checkProductHeader();
    });

    Then("the user sees all available products");
    await test.step("Verify products", async () => {
      await app.inventory.verifyProducts();
    });
  });

  test("SauceDemo verify Add to Cart", async ({ app }) => {

    Given("the user is on the products page");
    await test.step("Products Title", async () => {
      await app.inventory.checkProductHeader();
    });

    Then("the user verifies the list of products");
    await test.step("Verify products", async () => {
      await app.inventory.verifyProducts();
    });

    Then("the user adds products to the cart");
    await test.step("Add to Cart", async () => {
      await app.inventory.addProductsToCart();
    });
  });
});
