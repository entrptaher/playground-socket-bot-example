const path = require("path");
const puppeteer = require(process.cwd() + "/node_modules/puppeteer");
const Nightmare = require(process.cwd() + "/node_modules/nightmare");

const functions =  {
  async getNightmareTitle(url) {
    if (!url) return "No url Provided :/ ";

    const nightmare = Nightmare({
      show: true,
      electronPath: require(process.cwd() + "/node_modules/electron")
    });
    return nightmare
      .goto(url)
      .title()
      .end();
  },
  async getPuppeteerTitle(url) {
    if (!url) return "No url Provided :/ ";

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(url);
    const title = await page.title();

    await browser.close();
    return title;
  }
};

module.exports = functions;