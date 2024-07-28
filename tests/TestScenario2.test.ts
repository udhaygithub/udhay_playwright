import { test, expect } from '@playwright/test';

test("TestScenario_2_Drag&DropSliders", async ({ page }) => {
  // Step 1: Open Selenium Playground page
  await page.goto('https://www.lambdatest.com/selenium-playground', { waitUntil: 'domcontentloaded' });

  // Step 2: Click "Drag & Drop Sliders" link
  const dragDropSlidersLink = page.locator('a:has-text("Drag & Drop Sliders")');
  await dragDropSlidersLink.waitFor({ state: 'visible', timeout: 60000 });
  await dragDropSlidersLink.click();

  // Step 3: Validate if the URL contains “drag-drop-range-sliders-demo”
  await expect(page).toHaveURL(/.*drag-drop-range-sliders-demo/);

  // Step 4: Select the specific slider with "Default value 15"
  const slider = page.locator('input[type="range"][value="15"]'); // Target slider with initial value 15
  const sliderValue = page.locator('#rangeSuccess');

  // Ensure the slider is visible before interacting
  await slider.waitFor({ state: 'visible', timeout: 60000 });

  // Drag the slider to the value of 95
  const targetValue = 95;
  const tolerance = 2; // Allowable tolerance range.. Hence may go upto 97 --> Point to note
  const sliderBoundingBox = await slider.boundingBox();

  if (sliderBoundingBox) {
    const startX = sliderBoundingBox.x;
    const endX = sliderBoundingBox.x + sliderBoundingBox.width;
    const sliderRange = endX - startX;
    const sliderStepCount = 100; // Assuming 100 steps, can adjust if needed
    const stepWidth = sliderRange / sliderStepCount;
    const targetX = startX + ((targetValue / 100) * sliderRange);

    // Debug and visualize slider movement
    await page.screenshot({ path: 'pre-move-screenshot.png' });

    // Drag the slider to the target value
    await slider.hover();
    await page.mouse.down();
    await page.mouse.move(targetX, sliderBoundingBox.y + sliderBoundingBox.height / 2, { steps: 30 });
    await page.mouse.up();

    // Capture a screenshot after moving the slider
    await page.screenshot({ path: 'post-move-screenshot.png' });
  } else {
    throw new Error('Slider bounding box not found');
  }

  // Wait for the slider to update and validate the range value shows close to 95
  await page.waitForTimeout(2000); // Allow extra time for the value to be updated

  // Get the actual slider value
  const actualValue = await sliderValue.innerText();
  const actualNumber = parseFloat(actualValue);
  
  // Check if the actual value is within the tolerance range
  expect(actualNumber).toBeGreaterThanOrEqual(targetValue - tolerance);
  expect(actualNumber).toBeLessThanOrEqual(targetValue + tolerance);

  // Additional debug information
  console.log(`Expected value: ${targetValue}, Actual value: ${actualNumber}`);
});
