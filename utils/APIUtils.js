class APIUtils {
    constructor(apiContext, loginPayload){
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
        this.loginAPI = "https://rahulshettyacademy.com/client";
        // this.loginAPI = "https://rahulshettyacademy.com/client/api/ecom/auth/login";
        this.addToCartAPI = "https://rahulshettyacademy.com/api/ecom/user/add-to-cart";
    }

    print(printOutText){
        console.log("API Utils log: ", printOutText)
    }

    async getToken(){
        const loginResponse = await this.apiContext.post(this.loginAPI, {data:this.loginPayload})
        this.print(loginResponse);
        const loginResponseJson = loginResponse.json();
        const token = loginResponseJson.json;
        this.print(token);
        return token;
    }

    async createOrder(orderPayload){
        let response = {};
        response.token = await this.getToken();
        const orderPlacedResponse = await this.apiContext.post(this.addToCartAPI, {
            data:orderPayload, 
            headers:{
                'Authorization': response.token,
                'Content-Type': 'application/json'
            }});
        const orderResponseJson = await orderPlacedResponse.json();
        const orderID = orderResponseJson.orders[0];
        this.print("Your order id is: ", orderID)
        response.orderID = orderID;
        return response;
    }
}

module.exports = {APIUtils}