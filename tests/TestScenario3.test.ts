import { test, expect } from '@playwright/test';

test("TestScenario_3_InputFormSubmit", async ({ page }) => {
  // Step 1: Open Selenium Playground page website
  await page.goto('https://www.lambdatest.com/selenium-playground', { waitUntil: 'domcontentloaded' });

  // Step 2: Click "Input Form Submit" link
  await page.click('//a[contains(text(), "Input Form Submit")]');

  // Define XPath selectors
  const formXPath = '//form[contains(@id, "seleniumform")]'; 
  const submitButtonXPath = `${formXPath}//button[contains(text(), "Submit")]`;
  const nameFieldXPath = '(//label[text()="Name*"]/following::input)[1]';
  const emailFieldXPath = '(//label[text()="Email*"]/following::input)[1]';
  const passwordFieldXPath = '(//label[text()="Password*"]/following::input)[1]';
  const companyFieldXPath = '(//label[text()="Company*"]/following::input)[1]';
  const websiteFieldXPath = '(//label[text()="Website*"]/following::input)[1]';
  const countryDropdownXPath = '//select[contains(@class,"w-full border")]';
  const cityFieldXPath = '(//label[text()="City*"]/following::input)[1]';
  const address1FieldXPath = '(//label[text()="Address*"]/following-sibling::input)[1]'; 
  const address2FieldXPath = '((//label[text()="Address*"])[2]/following::input)[1]';
  const stateFieldXPath = '(//label[text()="State*"]/following::input)[1]';
  const zipCodeFieldXPath = '//label[text()="Zip Code*"]/following::input';
  const successMessageXPath = '//form[@id="seleniumform"]/following-sibling::p[1]';

  // Step 3: Wait for the form to be visible
  const form = page.locator(formXPath);
  
  try {
    await form.waitFor({ state: 'visible', timeout: 10000 });
  } catch (error) {
    console.error('Form not visible:', error);
    await page.screenshot({ path: 'form-not-visible.png', fullPage: true }); 
    throw error; // Re-throw the error
  }

  // Step 4: Click “Submit” without filling in any information in the form
  const submitButton = page.locator(submitButtonXPath);
  await submitButton.click();

  // Step 5: Assert the native validation error message
  const nameField = page.locator(nameFieldXPath);
  
  try {
    await nameField.focus();
    await nameField.evaluate(el => el.blur()); // Trigger blur to show validation message
    
    // Check for browser-native validation
    const validationMessage = await page.evaluate(() => {
      const field = document.querySelector('input[name="name"]');
      return field ? (field as HTMLInputElement).validationMessage : null;
    });

    expect(validationMessage).toBe('Please fill out this field.'); // This works fine in Chrome & Safari only
    //expect(validationMessage).toBe('Please fill in this field.'); // This works fine in chromium only
    //expect(validationMessage).toBe('Please fill in the fields'); // This works fine in none of the browsers, but this is what asked in the test requirement.

  } catch (error) {
    console.error('Validation tooltip not found or does not match:', error);
    await page.screenshot({ path: 'validation-error.png', fullPage: true }); 
    throw error; // Re-throw the error
  }

  // Ensure all fields are visible before interacting with them
  try {
    const fields = [
      nameFieldXPath,
      emailFieldXPath,
      passwordFieldXPath,
      companyFieldXPath,
      websiteFieldXPath,
      countryDropdownXPath,
      cityFieldXPath,
      address1FieldXPath,
      address2FieldXPath,
      stateFieldXPath,
      zipCodeFieldXPath
    ].map(selector => page.locator(selector));

    for (const field of fields) {
      await field.waitFor({ state: 'visible', timeout: 10000 });
    }

  } catch (error) {
    console.error('One or more fields are not visible:', error);
    await page.screenshot({ path: 'fields-not-visible.png', fullPage: true });
    throw error; // Re-throw the error
  }

  // Fill the fields
  try {
    await page.fill(nameFieldXPath, 'John Doe');
    await page.fill(emailFieldXPath, 'john.doe@example.com');
    await page.fill(passwordFieldXPath, 'password123');
    await page.fill(companyFieldXPath, 'Doe Inc.');
    await page.fill(websiteFieldXPath, 'https://www.doeinc.com');
    await page.selectOption(countryDropdownXPath, { label: 'United States' });
    await page.fill(cityFieldXPath, 'New York');
    await page.fill(address1FieldXPath, '123 Main St');
    await page.fill(address2FieldXPath, 'Apt 4B');
    await page.fill(stateFieldXPath, 'NY');
    await page.fill(zipCodeFieldXPath, '10001');
  } catch (error) {
    console.error('Failed to fill one or more fields:', error);
    await page.screenshot({ path: 'form-filling-error.png', fullPage: true }); 
    throw error; // Re-throw the error
  }

  // Step 7: Click “Submit”
  await submitButton.click();

  // Step 8: Once submitted, validate the success message
  const successMessageLocator = page.locator(successMessageXPath);
  
  try {
    await successMessageLocator.waitFor({ state: 'visible', timeout: 10000 });
    await expect(successMessageLocator).toHaveText('Thanks for contacting us, we will get back to you shortly.', { timeout: 10000 });
  } catch (error) {
    console.error('Success message not found or does not match:', error);
    await page.screenshot({ path: 'success-message-error.png', fullPage: true }); 
    throw error; // Re-throw the error
  }

  // Optionally take a screenshot for debugging
  await page.screenshot({ path: 'form-submission-success.png', fullPage: true });
});
