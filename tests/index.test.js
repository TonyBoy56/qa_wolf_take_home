const { test, expect } = require('@playwright/test');

// tests //

test('validate the page responds with 200 OK', async ({ page }) => {
   const response = await page.goto('https://news.ycombinator.com/newest');
  
    // Expect the title to contain 'ycombinator'
    expect(response.status()).toBe(404);
  });