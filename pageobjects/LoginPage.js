class LoginPage {

    constructor(page) {
        this.page = page;
        this.usernameField = page.locator('#userEmail');
        this.passwordField = page.locator('#userPassword');
        this.singInButton = page.locator('#login');
    };



    async gotoLoginPage() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    };  
    
    async validLogin(username, password) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.singInButton.click();
        await this.page.waitForLoadState('networkidle');
    };

}

module.exports = {LoginPage};
