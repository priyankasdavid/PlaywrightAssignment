const {test, expect} = require('@playwright/test')

test('Events', async({page})=>{
    await page.goto("/login"),
    await page.locator("#email").fill("qwerty12345@abc.com");
    await page.locator("#password").fill("Password@123");
    await page.locator("#login-btn").click();
    await page.locator("a:has-text('Browse Events →')").click();

    await expect(page.locator("h1:has-text('Upcoming Events')")).toBeVisible();
    await page.getByPlaceholder("Search events, venues…").fill("World");
    const category = await page.locator(".flex select");
    await category.nth(0).selectOption("Conference");
    await category.nth(1).selectOption("Hyderabad");

    const eventname = "World Tech Summit";
  //  const Value = await page.locator('h3:has-text(eventname)');
    const eventCard = await page.locator("#event-card").filter({hasText:eventname});
    const eventtitle = await eventCard.locator('h3').textContent();
    const price = await eventCard.locator('p').textContent();
    const seats = await eventCard.locator('span').last().textContent();
    const count = parseInt(seats);
    await expect(eventtitle?.trim()).toBe("World Tech Summit");
    await expect(price.trim().startsWith("$")).toBe(true);
    await expect(count).toBeGreaterThan(0);
    
    await eventCard.locator("#book-now-btn").click();
    await expect(page.url()).toContain('/events?');
    await expect(page.locator('h1')).toHaveText(eventname);
    await expect(page.locator('p:has-text("$")')).toHaveText(price);

    await page.getByText('Events').nth(1).click();
    const clearfilters = page.locator('button:has-text("Clear filters")');
    if(await clearfilters.isVisible()){
      clearfilters.click();
    }
    
    const totalEvents = await page.locator("#event-card");
    const countevents = await totalEvents.count();
    await expect(totalEvents.first()).toBeVisible();
    await expect(countevents).toBeGreaterThan(3);
    await totalEvents.allTextContents();
    const titlename = await totalEvents.locator("h3");
    const firstevent = await titlename.first().textContent();
    const secondevent = await titlename.nth(1).textContent();
    const lastevent = await titlename.last().textContent();
    expect(firstevent).toBeTruthy();
    expect(secondevent).toBeTruthy();
    expect(lastevent).toBeTruthy();
    expect(firstevent).not.toBe(lastevent);
})