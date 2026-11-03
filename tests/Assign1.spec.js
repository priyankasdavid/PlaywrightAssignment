const {test,expect} = require('@playwright/test');

test('Booking Flow', async({page}) =>{
    //Step 1
    const pageurl = "https://eventhub.rahulshettyacademy.com/";
    await page.goto(pageurl);
    const eventName = 'Birthday Bash';
    const email = "qwerty12345@abc.com";
    const phoneNumber = "01234569877"
    await page.getByPlaceholder("you@email.com").fill(email);
    await page.getByLabel("Password").fill("Password@123");
    await page.locator("#login-btn").click();
    await expect(page.locator("a:has-text('Browse Events →')")).toBeVisible();

    //Step 2
    await page.locator("#nav-events").click();
    await page.locator("[href='/admin/events']").nth(1).click();
    const TestEvent = 'Test Event ${Date.now()}';
    await page.locator("#event-title-input").fill(eventName);
    await page.locator("#admin-event-form textarea").fill("Enjoy Birthday Month");
    await page.getByLabel("City").fill("Pune");
    await page.getByLabel("Venue").fill("Seasons Mall, Hadapsar");

    function futureDateValue(){
        const date = new Date();
        date.setDate(date.getDate()+7);
        return date.toISOString().slice(0,16)
    }
    await page.getByLabel("Event Date & Time").fill(futureDateValue());
    await page.getByLabel("Price ($)").fill("80");
    await page.getByLabel("Total Seats").fill("50");
    await page.locator("#add-event-btn").click();
    await expect(page.getByText("Event created!")).toBeVisible();

    //Step 3
    await page.locator("[href = '/events']").first().click();
    const allEvents = await page.locator('[data-testid="event-card"]');
    //console.log(allEvents);
    await expect(page.locator('[data-testid="event-card"]').nth(0)).toBeVisible();
    const findElement = allEvents.filter({hasText:eventName}).first();
    await expect(findElement).toBeVisible({timeout:5000});
    console.log(findElement);
    const count = await findElement.getByText("seats").textContent();
    console.log(count)
    const seatsBeforeBooking = count.split(" ")[0];

    //Step 4
    await findElement.locator('[data-testid="book-now-btn"]').click();

    //Step 5
    const ticketCount = page.locator("#ticket-count");
    await expect(ticketCount).toHaveText("1");

    await page.getByLabel("Full Name").fill("Elijah");
    await page.locator("#customer-email").fill(email);
    await page.getByPlaceholder("+91 98765 43210").fill(phoneNumber);
    await page.locator(".confirm-booking-btn").click();
       
    //Step 6
    const bookingrefnumber = await page.locator(".booking-ref").first();
    await expect(bookingrefnumber).toBeVisible();
    const bookingref = (await bookingrefnumber.innerText()).trim();
    expect(bookingref.charAt(0)).toBe(eventName.trim().charAt(0).toUpperCase());
    console.log(`Booking confirmed. Ref: ${bookingref}`);    
    

    //Step 7
    await page.getByText("View My Bookings").click();
    await expect(page).toHaveURL('${BASE_URL}/bookings');
    const firstBookingCard = await page.locator("#booking-card").allTextContents();
    expect(page.locator(firstBookingCard)).first().toBeVisible();
    page.locator()

    await page.pause();

})