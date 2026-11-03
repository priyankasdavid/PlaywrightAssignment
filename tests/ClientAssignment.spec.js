const {test,expect} = require('@playwright/test');

test('ClientAssignment', async({page}) =>{
    await page.goto("https://rahulshettyacademy.com/client");
    const productName = "ZARA COAT 3"; 
    const products = page.locator(".card");
    await page.locator("#userEmail").fill("qwerty12345@abc.com");
    await page.locator("#userPassword").fill("Password@123");
    await page.locator("#login").click();
    await page.waitForLoadState("networkidle");
    await page.locator(".card").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
    for(let i=0; i<count; ++i){
        if(await products.nth(i).locator("b").textContent()=== productName){
            await products.nth(i).locator("text = Add To Cart").click();
            break;
        }   
    }
    await page.locator('[routerlink*="cart"]').click();
    await page.locator("text=Checkout").click();



    await page.getByPlaceholder('Select Country').pressSequentially("ind", { delay: 150 }) 
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }

  // expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);

   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");


   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
   await page.locator('[routerlink*="myorders"]').first().click();
   await page.locator(".ng-star-inserted").allTextContents(orderId);

   const rowss = await page.locator("tbody tr");

   for (let i= 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rowss.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetailss = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetailss)).toBeTruthy();

    await page.pause();









    /*
    await page.locator('.text-reset').click();
    await page.locator('#firstName').fill("ABCDEFG");
    await page.locator('#userEmail').fill("abc123456@abc.com");
    await page.locator('#userMobile').fill("26459878");

    await page.locator('[formcontrolname="occupation"]').click();
    await page.locator('select: has-text("Engineer")');
    await page.locator('input[type="radio"][value="Female"]');

    await page.pause();
    */
    
    //await page.locator('.select option').nth(1).click();
   // await page.locator('option:has-text("Student")').click();


})
     