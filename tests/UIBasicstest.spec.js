const {test,expect} = require('@playwright/test');
const { only } = require('node:test');


test.only('Browser Basic', async({browser}) =>{
    const context = await browser.newContext();
    const page1 = await context.newPage(); 
    const username =  page1.locator('#username');
    const signin = page1.locator('[name="signin"]');
    await page1.goto("https://rahulshettyacademy.com/loginpagepractise/");
    console.log(await page1.title());
    await expect(page1).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await username.fill("Rahulshetty");
    await page1.locator('[type = "password"]').fill("Learning@830$3mK2");
    await signin.click();
    console.log(await page1.locator('[style*="block"]').textContent());
    await expect(page1.locator('[style*="block"]')).toContainText('Incorrect');
    await username.fill("");
    await username.fill("rahulshettyacademy");
    await signin.click();
   // console.log(await page1.locator(".card-body a").first().textContent());
    //console.log(await page1.locator(".card-body a").nth(2).textContent());
    //await page1.waitForLoadState('networkidle');
    
    await page1.locator(".card-body a").first().waitFor();
    const allTitles = await page1.locator(".card-body a").allTextContents();
    console.log(allTitles);

});

test('Page Playwright Test', async ({page})=>{
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});