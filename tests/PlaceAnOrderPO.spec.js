const {test, expect} = require('@playwright/test');
const {POmanager} = require('../pageobjects/POmanager');
const dataSet = JSON.parse(JSON.stringify(require('../utils/placeorderTestData.json')));

for(const set of dataSet) {
    test(`@WEB Placing an order ${set.productName}`, async ({page})=>
        {   
        const poManager = new POmanager(page);

        const loginPage = poManager.getLoginPage();
        await loginPage.gotoLoginPage();
        await loginPage.validLogin(set.username, set.password);
            
        const desiredProduct = set.productName;
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAndAddCart(desiredProduct);
            
        const cartPage = poManager.getCartPage();
        await cartPage.goToCart();
        await cartPage.verifyProductInCart(desiredProduct);
        await cartPage.clickOnBuyNow();
            
        const checkOutPage = poManager.getCheckOutPage();
        const orderNum = await checkOutPage.checkOutProduct(desiredProduct, "123", "me me", "coupon", "Isr");
            
        const ordersPage = poManager.getOrdersPage();
        await ordersPage.goToOrders();
        const numberOfOrders = await ordersPage.ordersList.count();
        for(let i = 0; i < numberOfOrders; ++i) {
            const orderId = await ordersPage.ordersList.nth(i).locator("th").textContent()
            if (orderNum.includes(orderId)) {
                await ordersPage.ordersList.nth(i).locator("button").first().click();
                break;
            }
        }
        const summary = page.locator('div.email-title');
        await expect(summary).toBeVisible();
})
};
