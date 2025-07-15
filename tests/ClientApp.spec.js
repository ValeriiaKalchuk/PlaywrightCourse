const {test, expect} = require('@playwright/test');

test('@WEB Playwright page Test', async ({page})=> 
{
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator('#userEmail').fill("anshika@gmail.com")
    await page.locator('#userPassword').fill("Iamking@000")
    await page.locator('#login').click()
    // await page.waitForLoadState('networkidle') //will wait here until network is idle which happenes only after all network calls are made
    // the above impleemtation sometimes flaky , secifically the case of 'networkidle', try the below impleemntation as an alternative:
    await page.locator('.card-body b').first().waitFor()
    const titles = await page.locator('.card-body b').allTextContents()
    console.log(titles)

}); 