const { test, expect, selectors } = require("@playwright/test");

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
  (async () => {
    const createTagNameEngine = () => ({
      query(root, selector){
        return root.querySelector(selector);
      }
    })
  });

  await page.goto("https://news.ycombinator.com/newest");
  
  // Retrieve the entire document of the webpage
  const articles = await page.evaluate(() => document.body.innerHTML);
  // show HTML content in the console
  // console.log("Body HTML content:", articles);

  const article_titles = await page.getAttribute(selectors, 'td.title');
  console.log("Articles on pageload: ", article_titles);



  // const articleElements = await page.$$eval('a.storylink', elements => elements.map(elements => elements.outerHTML));

  // console.log("HTML of each article title element:", articleElements.forEach((html, index) => {
  //   `${index + 1}: ${html}`;
  // }));

  // articleElements.forEach((html, index) => {
  //   console.log(`${index + 1}: ${html}`);
  // })


});