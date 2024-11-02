const { test, expect } = require("@playwright/test");

// tests //

test("validate the page responds with 200 OK", async ({ page }) => {
  const response = await page.goto("https://news.ycombinator.com/newest");

  // Expect the page to load with a 200 OK status
  expect(response.status()).toBe(200);
});

test("validate pagename contains 'ycombinator' in the url", async ({ page }) => {
  const response = await page.goto("https://news.ycombinator.com/newest");
  const response_url = (response._initializer.url);
  // Expect the title to contain 'ycombinator'
  expect(response_url).toContain('ycombinator');
});

test("validate pagename contains '/newest' in the url", async ({ page }) => {
  const response = await page.goto("https://news.ycombinator.com/newest");
  const response_url = (response._initializer.url);
  // Expect the title to contain 'ycombinator'
  expect(response_url).toContain('/newest');
});

test ("validate upon pageload, the first 100 articles displayed are sorted in order from newest to oldest", async ({ page }) => {
  await page.goto("https://news.ycombinator.com/newest");
  
  const articles = await page.evaluate(() => document.body.innerHTML);
  console.log("Body HTML content:", articles);


});