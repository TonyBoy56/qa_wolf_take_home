// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");
const { exec } = require('child_process');

// Run Playwright tests
function runTests() {
  return new Promise((resolve, reject) => {
    exec('npx playwright test && npx playwright show-report', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error running tests: ${error}`);
        reject(error);
      } else {
        console.log(stdout);
        resolve(stdout);
      }
    });
  });
}

async function sortHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");
  // execute function to run tests and show report of test results
  await runTests();
}

(async () => {
  await sortHackerNewsArticles();
})();
