const {test, expect} = require('@playwright/test');

// test.describe.configure({ mode: 'parallel' });
// the above will run tests in parallel, by default it is set to 'serial'
test.describe.configure({ mode: 'serial' });
// the above will run tests in serial, this will say explicitly that tests should run one after another, 
// also helpful when there is a dependence between tests so that th following tests after the failed one will be skipped
test('Child Window handle', async ({browser})=>
{   
    console.log("Hello World")
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const link = page.locator("[href*='documents-request']");
    
    const [newPage] = await Promise.all([
        page.context().waitForEvent('page'), //here it will start listening to a new event
        link.click(),
    ]);
    // if two pages were open -> const [newPage,newPage2] = await Promise.all([])
    
    const emailUsMessage = await newPage.locator('.red').textContent();
    console.log(emailUsMessage);
    const domain = emailUsMessage.split('@')[1].split(' ')[0];
    console.log(domain);

    const userName = page.locator('#username');
    await userName.fill(domain); //switching here back to the parent page
    console.log(await userName.textContent());

});

test('@WEB UI controls', async ({browser})=> 
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    const dropDown = page.locator('select.form-control');
    const link = page.locator("[href*='documents-request']");

    await dropDown.selectOption('teach');
    // await page.pause(); //pauses and opens a playwright inspector - handy for debugging in live
    await page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();
    await expect(page.locator('.radiotextsty').last()).toBeChecked();
    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy(); //makes a difference where await is
    await expect(link).toHaveAttribute("class", "blinkingText");



}); 
// ANOTHER WAY TO CREATE PAGE CONST:
test('@WEB Basics', async ({page})=> 
{   
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');

    const userName = page.locator('#username');
    const signInButton = page.locator('#signInBtn');

    await userName.fill('rahulshetty');
    await page.locator('#password').fill('learning');
    await signInButton.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password.');
    await userName.fill("") //wiping off the existing content
    await userName.fill('rahulshettyacademy');
    await signInButton.click();

    const cardTitle = await page.locator('.card-body a');
    console.log(await page.locator('.card-body a').first().textContent());
    console.log(await page.locator('.card-body a').nth(1).textContent());
    const allTitles = await cardTitle.allTextContents(); //a list with all titles will be create


    console.log(allTitles);
    
}); 