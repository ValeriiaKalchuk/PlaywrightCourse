const {test, expect, request} = require("@playwright/test");
const {APIUtils} = require('../utils/APIUtils');

const loginPayload = {
    userEmail: "pods-02.quavery@icloud.com",
    userPassword: "123456789oK!@"
}
const orderPayload = {
    "_id": "6865399f129e250258c7557c",
    "product": {
        "_id": "67a8dde5c0d3e6622a297cc8",
        "productName": "ZARA COAT 3",
        "productCategory": "fashion",
        "productSubCategory": "shirts",
        "productPrice": 31500,
        "productDescription": "Adidas Originals",
        "productImage": "https://rahulshettyacademy.com/api/ecom/uploads/productImage_1650649434146.jpeg",
        "productRating": "0",
        "productTotalOrders": "0",
        "productStatus": true,
        "productAddedBy": "admin@gmail.com",
        "__v": 0,
        "productFor": "family"
    }
}

let response;

function print(printOutText){
    console.log("Test print: ", printOutText)
}

function findEl(lctr) {
    return page.locator(lctr)
}

test.beforeAll("", async()=>{
    // Login API
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});

// test.beforeEach(()=>{


// });
// @API  is a label. Tests with a specific label can be executed with the command:
// npx playwright test --grep @API
test('@API Placing an order with API', async ({page})=>
{   
    print("Injecting existing token into web storage")
    // Injecting a token into web storage 
    page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token);

    // Navigate to ORDERs page to verify the order appears in the placed orders list
    print("Verifying the order appears in the Orders list")
    await findEl("button[routerlink*='myorders']").click();
    await findEl("tbody").waitFor();
    const ordersList = findEl("tbody tr");
    const numberOfOrders = await ordersList.count()
    for(let i = 0; i < numberOfOrders; ++i) {
        if (await ordersList.nth(i).locator("th").textContent() === response.orderID){
            print("Order "+response.orderID+" verified to to be registered in the orders list")
            await ordersList.nth(i).locator("button").first().click();
            break;
        }
    }
    const summary = findEl('div.email-title')
    await expect(summary).toBeVisible()
});