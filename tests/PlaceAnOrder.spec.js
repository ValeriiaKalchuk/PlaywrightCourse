const {test, expect} = require('@playwright/test');

test.skip('Placing an order', async ({page})=>
{   
    function findEl(lctr) {
        return page.locator(lctr)
        }

    // Navigating to a page to sign in
    await page.goto("https://rahulshettyacademy.com/client");
    await findEl('#userEmail').fill("pods-02.quavery@icloud.com");
    await findEl('#userPassword').fill("123456789oK!@");
    await findEl('#login').click();
    await page.waitForLoadState('networkidle'); //will wait here until network is idle which happenes only after all network calls are made
    // the above impleemtation sometimes flaky , secifically the case of 'networkidle', try the below impleemntation as an alternative:
    // await page.locator('.card-body b').first().waitFor()

    // Add to cart a product
    const desiredProduct = "ZARA COAT 3";
    const products = findEl(".card-body b");
    const allProductsCount = await products.count();
    for (let i=0; i < allProductsCount; ++i){
        if (await products.nth(i).locator("b").textContent() === desiredProduct) {
            await products.nth(i).locator("text=  Add To Cart").click();
            break;
        }
    }

    // Go to cart to verify the product name appears there, and click on checkcout
    await findEl("[routerlink*='cart']").click();
    await findEl("div li").first().waitFor();
    const productInCart = await findEl(`h3:has-text("${desiredProduct}")`).isVisible();
    expect(productInCart).toBeTruthy();
    findEl("button[type='button']").last().click();
    await findEl("div.payment").waitFor();
    
    // Insert credict card details and all other info and click place order
    await findEl('input[type="text"]').nth(1).fill("123");
    await findEl('input[type="text"]').nth(2).fill("me me");
    await findEl('input[type="text"]').nth(3).fill("coupon");
    await findEl("input[placeholder='Select Country']").pressSequentially('Isr');
    const dropDownList = findEl(".ta-results");
    await dropDownList.waitFor()
    const resultsNumber = await dropDownList.locator('button').count();
    for(let i = 0; i < resultsNumber; ++i) {  
            if (await dropDownList.locator('button').nth(i).textContent() === " Israel"){
                    await dropDownList.locator('button').nth(i).click();
                    break;
            }
        }
    await findEl('a.btnn').click();
    await findEl(".hero-primary").waitFor();
    const orderNum = await findEl("label.ng-star-inserted").textContent();
    
    // Navigate to ORDERs page to verify the order appears in the placed orders list
    await findEl("button[routerlink*='myorders']").click();
    await findEl("tbody").waitFor();
    const ordersList = findEl("tbody tr");
    const numberOfOrders = await ordersList.count()
    for(let i = 0; i < numberOfOrders; ++i) {
        const orderId = await ordersList.nth(i).locator("th").textContent()
        if (orderNum.includes(orderId)) {
            await ordersList.nth(i).locator("button").first().click();
            break;
        }
    }
    const summary = findEl('div.email-title')
    await expect(summary).toBeVisible()
});