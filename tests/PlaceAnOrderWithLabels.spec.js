const {test, expect} = require('@playwright/test');

test.skip('Placing an order', async ({page})=>
{   
    function findEl(lctr) {
        return page.locator(lctr)
        }

    // Navigating to a page to sign in
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill("pods-02.quavery@icloud.com");
    await page.getByPlaceholder("enter your passsword").fill("123456789oK!@");
    await page.getByRole("button", {name: "Login"}).click();
    await page.waitForLoadState('networkidle'); //will wait here until network is idle which happenes only after all network calls are made
    // the above impleemtation sometimes flaky , secifically the case of 'networkidle', try the below impleemntation as an alternative:
    // await page.locator('.card-body b').first().waitFor()

    // Add to cart a product
    const desiredProduct = "ZARA COAT 3";
    await findEl(".card-body").filter({hasText: desiredProduct}).getByRole('button', {name: " Add To Cart"}).click();

    // Go to cart to verify the product name appears there, and click on checkcout
    await page.getByRole('listitem').getByRole('button', {name: "Cart"}).click();
    await findEl("div li").first().waitFor();
    await expect(page.getByText("My Cart")).toBeVisible();
    await page.getByRole('button', {name: "Checkout"}).click();
    await expect(page.getByText(" Payment Method ")).toBeVisible();
    
    // Insert credict card details and all other info and click place order
    await findEl('input[type="text"]').nth(1).fill("123");
    await findEl('input[type="text"]').nth(2).fill("me me");
    await findEl('input[type="text"]').nth(3).fill("coupon");
    await page.getByPlaceholder("Select Country").pressSequentially('Isr');
    await page.getByRole('button', {name: " Israel"}).click()
    await page.getByText("Place Order ").click();
    await page.getByText(" Thankyou for the order. ").isVisible();
    const text = await findEl("label.ng-star-inserted").textContent();
    const orderNum = text.replace(/\|/g, '').trim()
    
    // Navigate to ORDERs page to verify the order appears in the placed orders list
    await page.getByRole('button', {name: "  ORDERS"}).click();
    await expect(page.getByText("Your Orders")).toBeVisible();
    page.getByRole('row', {name: orderNum}).getByRole('button', {name: "View"}).click();
    await expect(page.getByText(" order summary ")).toBeVisible();
});