const {test , expect} = require('@playwright/test');

test('Smoke Test Login', async({page}) =>{
    await page.goto('/login');
    const title = page.title();
    const email = page.locator("#email");
    const signin = page.locator("#login-btn");
    await expect(page).toHaveTitle("EventHub — Discover & Book Events");
    await expect(email,signin).toBeVisible();
})

test('Login', async({browser}) =>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('/login');
    const email = "beginner@sample.com";
    const enterEmail = await page.locator("#email");
    await enterEmail.fill(email);
    await expect(enterEmail).toHaveValue(email);

    //New Browser Context
    const newcontext = await browser.newContext();
    const newPage = await context.newPage();
    await newPage.goto('https://eventhub.rahulshettyacademy.com/login');
    await expect(newPage).toHaveTitle("EventHub — Discover & Book Events");
    await expect(newPage.locator("#email")).toBeEmpty();
    await newcontext.close();
})