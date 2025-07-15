const {test, expect, request} = require("@playwright/test");
const {APIUtils} = require('../utils/APIUtils');
const orderLinkForRouting = "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*"
const fakePayloadOrders = {data:[], message:"No Orders"};

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



// test.beforeAll("", async()=>{
//     // Login API
//     const apiContext = await request.newContext();
//     const apiUtils = new APIUtils(apiContext, loginPayload);
//     response = await apiUtils.createOrder(orderPayload);
// });

test('Placing an order with API', async ({page})=>
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


    // print("Injecting existing token into web storage")
    // // Injecting a token into web storage 
    // page.addInitScript(value => {
    //     window.localStorage.setItem('token', value)
    // }, response.token);

    // // Mocking orders
    // await page.goto("https://rahulshettyacademy.com/client")
    await page.route(orderLinkForRouting, async route=>
        {
            const response = await page.request.fetch(route.request()); //here we`re turning the page into API mode, and fetching the response of the API call we provided, the response is stored in the 'route', and tresponse of the call we store in the 'response'
            let body = JSON.stringify(fakePayloadOrders);//converting it to json since fakePayloadOrders is a javascript object
            route.fulfill({
                response, body //in body it overrides the existing body of a real response with a fake body we provide
            }) //sending the response back to browser
        // intercepting response: API response -> ||{here is the response hijaccking occurs}||browser ->render data on front end
        })
    
    print("Verifying the Orders empty page")
    await findEl("button[routerlink*='myorders']").click();
    await page.waitForResponse(orderLinkForRouting); //used to prevent racecondition due to delay of response coming back 
    await expect(page.getByText('You have No Orders to show at')).toBeVisible();
    
});