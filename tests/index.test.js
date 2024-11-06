const { test, expect, selectors } = require("@playwright/test");

// tests //

test("validate the page responds with 200 OK", async ({ page }) => {
  const response = await page.goto("https://news.ycombinator.com/newest");

  // Expect the page to load with a 200 OK status
  expect(response.status()).toBe(200);
});

test("validate pagename contains 'ycombinator' in the url", async ({
  page,
}) => {
  const response = await page.goto("https://news.ycombinator.com/newest");
  const response_url = response._initializer.url;
  // Expect the title to contain 'ycombinator'
  expect(response_url).toContain("ycombinator");
});

test("validate pagename contains '/newest' in the url", async ({ page }) => {
  const response = await page.goto("https://news.ycombinator.com/newest");
  const response_url = response._initializer.url;
  // Expect the title to contain 'ycombinator'
  expect(response_url).toContain("/newest");
});

test("validate upon pageload, the first 100 articles displayed are sorted in order from newest to oldest", async ({
  page,
}) => {
  await page.goto("https://news.ycombinator.com/newest");
  // Locate all date elements inside article tags
  const dateElements = await page.locator('span.age[title]');
  // Get the count of date elements
  const count = await dateElements.count();
  console.log("Tally of dateElements: ", count);

  // let dates = [];
  // for (let i = 0; i < count; i++) {
  //   const dateString = await dateElements.nth(i).getAttribute('datetime');
  //   const date = new Date(dateString);
  //   dates.push(date);
  // }
});
