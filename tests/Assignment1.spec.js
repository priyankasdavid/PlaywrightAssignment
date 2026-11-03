const { test , expect } = require('@playwright/test');

test.beforeEach(async({page}) =>{
    const pageurl = page.goto("https://eventhub.rahulshettyacademy.com/login");
})

test('EventHub Login', async ({ page }) => {
    const heading = page.getByText("Sign in to EventHub");
    const email = page.getByPlaceholder("you@email.com");
    const signin = page.locator("#login-btn");
    await expect(heading, email, signin).toBeVisible();
})

test('Password Check', async({page}) => {
    await expect(page.locator("#password")).toBeVisible();
    await expect(page.getByText("Sign in to EventHub")).toBeVisible();
})