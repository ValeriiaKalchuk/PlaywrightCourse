const { test, expect } = require("@playwright/test");
const linkForRouting = "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id="


test('Security test intercept', async ({ page }) => {
    // Navigating to a page to sign in
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator('#userEmail').fill("pods-02.quavery@icloud.com");
    await page.locator('#userPassword').fill("123456789oK!@");
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle'); //will wait here until network is idle which happenes only after all network calls are made
    // the above impleemtation sometimes flaky , secifically the case of 'networkidle', try the below impleemntation as an alternative:
    // await page.locator('.card-body b').first().waitFor()

    // Modifying request
    await page.route(linkForRouting + "*", async route => { //whenever u  encounter linkForRouting + "*", proceed (continue) w/ the following
        route.continue({ url: linkForRouting + "6666666666" })//whatever is placed into continue({}) will be a modified stuff we want to continue with 
    })
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator('button:has-text("View")').first().click();
    await expect(page.getByText('You are not authorize to view')).toBeVisible();

});