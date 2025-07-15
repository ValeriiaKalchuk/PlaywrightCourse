const {test, expect} = require('@playwright/test');
const ExcelJs = require('exceljs');

async function writeExcelTest(sheetToCheck, newText, searchText, filePath) {
    
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet(sheetToCheck);
    const cellToreplace = await readExcel(worksheet, searchText);

    const cell = worksheet.getCell(cellToreplace.row, cellToreplace.col);
    cell.value = newText;
    console.log(`Updated cell at ${cellToreplace.col} column /row ${cellToreplace.row}  to value: ${cell.value}`);

    await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet, searchText) {
    let cellToreplace = {row:-1, col:-1};
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                console.log(`Found ${searchText} in row: ${rowNumber}, column: ${colNumber}`);
                cellToreplace.row = rowNumber;
                cellToreplace.col = colNumber;
            };
        });
    })
    return cellToreplace;    
}


test('Update Excel file and Upload it',  async({page})=> {
    function findEl(lctr) {
        return page.locator(lctr);
    }
    const filePath = 'C:\\Users\\valer\\Downloads\\download.xlsx';

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    await page.waitForLoadState('networkidle');
    // await findEl("#downloadButton").click();
    // const downloadPromise = page.waitForEvent('download');
    // await downloadPromise;

    // const [download] = await Promise.all([
    //     await page.waitForEvent("download"),
    //     await findEl("#downloadButton").click(),
    // ]);
    // await download.saveAs(filePath);

    // console.log("File downloaded successfully");
    // writeExcelTest('Sheet1', 'Republic', 'Banana', filePath);

    // await findEl("#fileinput").setInputFiles(filePath);
    // await findEl("#fileinput").click();
    // await page.pause();

    // Veifying the uploaded file table UI on the website
    const textLocator = page.getByText("Apple");
    const rowInTable = page.getByRole('row').filter({has: textLocator});
    await expect(rowInTable.locator('#cell-4-undefined')).toContainText('345');
});