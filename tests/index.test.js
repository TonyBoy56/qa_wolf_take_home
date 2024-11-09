const { test, expect } = require("@playwright/test");

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
  // Visit the /newest path of the Hacker News forum
  await page.goto("https://news.ycombinator.com/newest");
  // Extract and parse all dates
  let dateTimes = [];
  // Establish a target for how many articles to parse datetime from
  const targetArticleCount = 100;
  
  while (dateTimes.length < targetArticleCount) {
    // Locate all date elements inside article tags
    const dateElements = await page.locator('span.age[title]');
    // Get the count of date elements
    const count = await dateElements.count();

    for (let i = 0; i < count; i++) {
      if (dateTimes.length >= targetArticleCount) break;
      // Grab the matching nth locator of i, return value within 'title' attribute. Store value as datetime.
      const datetime = await dateElements.nth(i).getAttribute('title');

      if (datetime) {
        // Remove the numbers after the space from the dateString
        const dateString = datetime.split(' ')[0];
        // Store dateString into dateTimes array
        dateTimes.push(dateString);
      }
    }

    if (dateTimes.length >= targetArticleCount) break;
    // Find and click the "More" button to load more articles
    const moreButton = await page.locator('a.morelink');
    if (await moreButton.isVisible()) {
      await moreButton.click();
      await page.waitForLoadState('networkidle');
    } else {
      console.log("No more articles to load.");
      break;
    }
  }

  function isSorted(dateStrings) {
    const dates = dateStrings.map(dateString => new Date(dateString));
    
    for (let i = 1; i < dates.length - 1; i++) {
      if (dates[i] < dates[i + 1]) {
        console.log(`Sorting error at index ${i}: ${dates[i]} is older than ${dates[i + 1]}`);
        return false;
      }
    }
    return true;
  }

  expect(isSorted(dateTimes)).toBe(true);
});
