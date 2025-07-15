const {test, expect} = require("@playwright/test");
let webContext;

test.beforeAll(async({browser})=>
{
// Navigating to a page to sign in
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator('#userEmail').fill("pods-02.quavery@icloud.com");
    await page.locator('#userPassword').fill("123456789oK!@");
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle'); //will wait here until network is idle which happenes only after all network calls are made
    // the above impleemtation sometimes flaky , secifically the case of 'networkidle', try the below impleemntation as an alternative:
    // await page.locator('.card-body b').first().waitFor();
    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState: "state.json"});

});

test("@API Add product to cart", async()=>{
    
    const page = await webContext.newPage(); //this page is created dynamically so no need to pass it int the async function as a fixture
    await page.goto("https://rahulshettyacademy.com/client");
    // Add to cart a product
    const desiredProduct = "ZARA COAT 3";
    const products = page.locator(".card-body");
    const allProductsCount = await products.count();
    for (let i=0; i < allProductsCount; ++i){
        if (await products.nth(i).locator("b").textContent() === desiredProduct) {
            await products.nth(i).locator("text=  Add To Cart").click();
            break;
        }
    }

    // Go to cart to verify the product name appears there, and click on checkcout
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const productInCart = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(productInCart).toBeTruthy();
    page.locator("button[type='button']").last().click();
    await page.locator("div.payment").waitFor();

});