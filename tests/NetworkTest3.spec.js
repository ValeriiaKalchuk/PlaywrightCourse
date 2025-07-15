const {test, expect} = require('@playwright/test');

test('Blocking calls API', async ({browser})=>
{   
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.route('**/*.css', async route=> {
        route.abort();
    }) // '**/*' - means 'any url'
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.pause();
});

test('Blocking images', async ({page})=> {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    const userName = page.locator('#username');
    const signInButton = page.locator('#signInBtn');

    await page.locator('#password').fill('learning');
    await userName.fill('rahulshettyacademy');
    await signInButton.click();

    await page.route('**/*.{jpg,png.jpeg}', async route=> {
        route.abort();
    })
    await page.pause();
});

// for debugging:
// page.on('request', request=> console.log(request.url())) - enables listeners of events, will print any urls of requests

// page.on('response', response=> console.log(response.url(), response.status())) - whenever responses are returned print them