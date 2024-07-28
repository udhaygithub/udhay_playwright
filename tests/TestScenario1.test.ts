import { test, expect } from '@playwright/test';
test("TestScenario_1_SimpleFormDemo", async ({ page }) => {

//     // Launch browser
//   const browser = await chromium.launch({ 
//   }); 
//   const context = await browser.newContext();
//   const page = await context.newPage();


  // Step 1: Open Lambda Selenium Playground
await page.goto('https://www.lambdatest.com/selenium-playground');

     // Step 2: Click “Simple Form Demo”
await page.click('text=Simple Form Demo');

// Step 3: Validate the URL contains “simple-form-demo”
const url = page.url();
if (!url.includes('simple-form-demo')) {
  console.log('URL validation failed.');
  return;
}

// Step 4: Create a variable for a string value
const message = 'Welcome to LambdaTest';
//const messageInput = page.locator("input#user-message"); = 'Welcome to LambdaTest';

// Step 5: Use this variable to enter values in the “Enter Message” text box
await page.fill('input#user-message', message);

// Step 6: Click “Get Checked Value”
//await page.click('button#showInput');
await page.click('button:has-text("Get Checked Value")');

// console.log(await messageInput.getAttribute("placeholder"));
// expect(messageInput).toHaveAttribute("placeholder", "Please enter your message")
// console.log('Before entering data: ' + await messageInput.inputValue());
// await messageInput.type('message');
// console.log('After entering data: ' + await messageInput.inputValue());

// Step 7: Validate whether the same text message is displayed in the right-hand panel under the “Your Message:” section
try {
    const messageLocator = page.locator('//label[text()="Your Message: "]/following-sibling::p');
    await messageLocator.waitFor({ state: 'visible', timeout: 15000 }); // Wait for the element to be visible
    const displayedMessage = await messageLocator.textContent();

    if (displayedMessage?.trim() === message) {
      console.log('Message validation passed.');
    } else {
      console.log('Message validation failed.');
    }
  } catch (error) {
    console.error('Error while validating the message:', error);
    await page.screenshot({ path: 'message-validation-error.png', fullPage: true }); // This is to take screenshot for debugging
  }
});