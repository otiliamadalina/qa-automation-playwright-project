import routes from "../resources/routes.json";
import strings from "../resources/strings.json";
import { And, Given, Then, When } from "../utils/adnotations";
import test from "./test";

test.beforeEach(async ({ app }) => {
  Given("the user accesses the Login Page");
  await test.step("Access Login Page", async () => {
    await app.base.navigateTo(routes.loginPage);
    await app.navigation.pageUrlAsExpected(routes.loginPage);
    await app.common.browserTabTitleAsExpected(strings.loginPage.pageTitle);
    await app.login.logoIsVisible();
  });

  Then("the user completes login form and moves forward");
  await test.step("Login", async () => {
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

test.describe(
  "Checkout tests",
  { tag: ["@checkout", "@regression"] },
  async () => {
    test("SauceDemo Verify Checkout Page @smoke", async ({ app }) => {
      Then("the user sees products title");
      await test.step("Verify products title", async () => {
        await app.inventory.checkProductHeader();
      });

      Then("the user sees products");
      await test.step("Verify products", async () => {
        await app.inventory.verifyProducts();
      });

      Then("the user adds products to cart");
      await test.step("Add to Cart", async () => {
        await app.inventory.addProductsToCart();
      });

      Then("the user goes to cart");
      await test.step("Go to Cart", async () => {
        await app.inventory.goToCart();
      });

      Then("the user sees cart URL as expected");
      await test.step("Cart URL", async () => {
        await app.navigation.pageUrlAsExpected(routes.cartPage);
      });

      Then("the user sees cart products");
      await test.step("Verify Cart Products", async () => {
        await app.cart.verifyCartProducts();
      });

      Then("the user goes to checkout page");
      await test.step("Go to Checkout", async () => {
        await app.cart.goToCheckout();
      });

      Then("the user sees checkout url step one");
      await test.step("Checkout URL Step One", async () => {
        await app.navigation.pageUrlAsExpected(routes.checkoutPageOne);
      });

      And("the user inputs credential for checkout and continues");
      await test.step("Input credential for Checkout and Continue", async () => {
        await app.checkout.inputCheckoutCredentials();
        await app.cart.continueCheckoutButton();
      });

      Then("the user sees checkout url step two");
      await test.step("Checkout Step Two", async () => {
        await app.navigation.pageUrlAsExpected(routes.checkoutPageTwo);
      });

      Then("the user presses finish button to finish operation");
      await test.step("Finish operation", async () => {
        await app.cart.finishButtonfromCart();
      });

      Then("the user sees checkout url complete page");
      await test.step("Checkout Complete Page", async () => {
        await app.navigation.pageUrlAsExpected(routes.checkoutComplete);
      });

      And("the user clicks on back to products button");
      await test.step("Back to Products", async () => {
        await app.checkout.backToProductsButton();
      });
    });

    test("SauceDemo Checkout Blank Fields", async ({ app }) => {
      When("the user attempts checkout with blank fields");

      Then("the user sees the products title");
      await test.step("Products Title", async () => {
        await app.inventory.checkProductHeader();
      });

      Then("the user sees products");
      await test.step("Verify products", async () => {
        await app.inventory.verifyProducts();
      });

      Then("the user adds products to cart");
      await test.step("Add to Cart", async () => {
        await app.inventory.addProductsToCart();
      });

      Then("the user goes to cart");
      await test.step("Go to Cart", async () => {
        await app.inventory.goToCart();
      });

      Then("the user sees cart URL as expected");
      await test.step("Cart URL", async () => {
        await app.navigation.pageUrlAsExpected(routes.cartPage);
      });

      Then("the user sees cart products");
      await test.step("Verify Cart Products", async () => {
        await app.cart.verifyCartProducts();
      });

      Then("the user goes to checkout page");
      await test.step("Go to Checkout", async () => {
        await app.cart.goToCheckout();
      });

      Then("the user sees checkout url step one");
      await test.step("Checkout URL Step One", async () => {
        await app.navigation.pageUrlAsExpected(routes.checkoutPageOne);
      });

      And("the user doesnt input any  credential for checkout and continues");
      await test.step("Blank Credentials for Checkout and Continue", async () => {
        await app.cart.continueCheckoutButton();
      });

      Then("the user sees error message");
      await test.step("Verify Error Message", async () => {
        await app.checkout.errorBlankFields();
      });

      And("the user clicks on cancel button and goes back to cart page");
      await test.step("Cancel - Back to Cart Page", async () => {
        await app.checkout.cancelButton();
      });

      Then("the user sees cart URL as expected");
      await test.step("Cart URL", async () => {
        await app.navigation.pageUrlAsExpected(routes.cartPage);
      });

      And("the user clicks on continue shopping button");
      await test.step("Continue shopping", async () => {
        await app.cart.continueShoppingButton();
      });

      Then("the user sees inventory URL as expected");
      await test.step("Inventory URL", async () => {
        await app.navigation.pageUrlAsExpected(routes.inventoryPage);
      });
    });
  }
);
