const { expect } = require('@playwright/test');

class CartPage {
    constructor(page) {
        this.page = page;
        this.cart = page.locator("[routerlink*='cart']");
        
    }
    
    async verifyProductInCart(productName) {
        await this.page.locator("div li").first().waitFor();
        const productInCart = await this.page.locator(`h3:has-text("${productName}")`).isVisible();
        expect(productInCart).toBeTruthy();
    }
    
    async goToCart() {
        await this.cart.click();
        await this.page.locator("div li").first().waitFor();
    }

    async clickOnBuyNow() {
        await this.page.locator("button[type='button']").last().click();
        await this.page.locator("div.payment").waitFor();
    }
}

module.exports = { CartPage };