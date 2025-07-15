class CheckOutPage {

    constructor(page) {
        this.page = page;
    }

    async checkOutProduct(productName, cvv, nameOnCard, couponCode, countryName) {

        await this.page.locator('input[type="text"]').nth(1).fill(cvv);
        await this.page.locator('input[type="text"]').nth(2).fill(nameOnCard);
        await this.page.locator('input[type="text"]').nth(3).fill(couponCode);
        await this.page.locator("input[placeholder='Select Country']").pressSequentially(countryName);
        const dropDownList = this.page.locator(".ta-results");
        await dropDownList.waitFor()
        const resultsNumber = await dropDownList.locator('button').count();
        for(let i = 0; i < resultsNumber; ++i) {  
                if (await dropDownList.locator('button').nth(i).textContent() === " Israel"){
                        await dropDownList.locator('button').nth(i).click();
                        break;
                }
            }
        await this.page.locator('a.btnn').click();
        await this.page.locator(".hero-primary").waitFor();
        const orderNum = await this.page.locator("label.ng-star-inserted").textContent();

        return orderNum;

    }

}

module.exports = { CheckOutPage };