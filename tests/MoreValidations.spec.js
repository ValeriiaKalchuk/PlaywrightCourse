const {test, expect} = require("@playwright/test");

test("@WEB Popup valiadations", async({page})=> {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.goBack();
    await page.goForward();
    await page.goBack();

    await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();

    await page.locator("#confirmbtn").click();
    page.on("dialog", dialog=>dialog.accept());
    await page.locator("#confirmbtn").click();
    page.on("dialog", dialog=>dialog.dismiss());

    await page.locator("#mousehover").hover();

    const pageFrame = page.frameLocator("#courses-iframe");
    pageFrame.locator("li a[href*='lifetime-access']:visible").click();
    const pageFrameText = await pageFrame.locator(".text h2").textContent();
    console.log(pageFrameText);
    console.log(pageFrameText.split(" ")[1]);

});

test('@WEB Screenshots', async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
    // await page.screenshot({path: 'visibleScreenshot.png'}) //whole page screenshot
    await page.locator('#displayed-text').screenshot({path: 'visibleScreenshot.png'}); //element only screenshot
    await page.locator('#hide-textbox').click();
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();
    // await page.screenshot({path: 'hiddenScreenshot.png'}) //whole page screenshot
    await page.locator('#hidden-text').screenshot({path: 'hiddenScreenshot.png'}); //element only screenshot
})

test('@WEB Visual comparison', async({page})=>{
    await page.goto("https://www.rediff.com");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');     //will fail if landing.png does not exist, and will create a screenshot with a given name. on the next run it will do a comparison
    
})