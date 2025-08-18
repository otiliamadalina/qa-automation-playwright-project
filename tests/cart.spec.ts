import routes from "../resources/routes.json";
import strings from "../resources/strings.json";
import { Given, Then } from "../utils/adnotations";
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

  Then("the user sees correct inventory URL")
  await test.step("Verify inventory URL", async () => {
    await app.navigation.pageUrlAsExpected(routes.inventoryPage);
  });
});

test.describe("Cart tests", { tag: ["@smoke", "@cart"] }, async () => {
test("SauceDemo verify Cart Products", async ({ app }) => {

    Then("the user sees products title");
    await test.step("Verify products title", async () => {
      console.log("Running checkProductHeader.");
      await app.inventory.checkProductHeader();
    });

    Then("the user sees products");
    await test.step("Verify products", async () => {
      console.log("Running verifyProducts.");
      await app.inventory.verifyProducts();
    });

    Then("the user adds products to cart");
    await test.step("Add to Cart", async () => {
      console.log("Running add to cart.");
      await app.inventory.addProductsToCart();
    });

    Then("the user goes to cart");
    await test.step("Go to Cart", async () => {
      console.log("Running go to cart.");
      await app.inventory.goToCart();
    });

    Then("the user sees cart products");
    await test.step("Verify Cart Products", async () => {
      console.log("Running cart products.");
      await app.cart.verifyCartProducts();
    });
  });
});
