class DashboardPage {

    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
    }

    async searchProductAndAddCart(desiredProduct) {
        const allProductsCount = await this.products.count();
        for (let i=0; i < allProductsCount; ++i){
            if (await this.products.nth(i).locator("b").textContent() === desiredProduct) {
                await this.products.nth(i).locator("text=  Add To Cart").click();
                break;
            }
        }

}
}
module.exports = {DashboardPage};