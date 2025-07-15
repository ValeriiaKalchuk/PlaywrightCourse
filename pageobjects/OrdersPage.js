const { expect } = require('@playwright/test');

class OrdersPage {
    constructor(page) {
        this.page = page;
        this.ordersList = page.locator("tbody tr");
    }

    async goToOrders() {
        await this.page.click("button[routerlink*='myorders']");
        await this.page.locator("tbody").waitFor();
    }

    async verifyProductInCart(productName) {
        const productInCart = await this.page.isVisible(`h3:has-text("${productName}")`);
        expect(productInCart).toBeTruthy();
    }
}

module.exports = { OrdersPage };