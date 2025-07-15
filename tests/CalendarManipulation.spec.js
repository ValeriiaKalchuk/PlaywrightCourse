const {test, expect} = require('@playwright/test');

test('@WEB Calendar', async({page})=> {
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.waitForLoadState('networkidle');

    const month = "1";
    const date = "11";
    const year = "2027";
    const expectedDate = [month, date, year]

    await page.locator('.react-date-picker__inputGroup').click();
    await page.locator('.react-calendar__navigation').click();
    await page.locator('.react-calendar__navigation').click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(month) - 1).click();
    await page.locator('//abbr[text()='+date+']').click()

    const chosenDate = page.locator(".react-date-picker__inputGroup");
    for(let i = 0; i < chosenDate.length; i++) {
        const value = chosenDate[i].getAttribute("value")
        expect(value).Equal(expectedDate[i]);
    }
}

);