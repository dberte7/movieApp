const puppeteer = require("puppeteer");
const fetch = require('node-fetch');
  
const scraping = {
  scrap: async (titulo, id) => {
    let imdb = id;
    const browser = await puppeteer.launch({
      headless: true
    });
    const page = await browser.newPage();
    await page.goto(`https://www.filmaffinity.com/es/search.php?stext=${titulo}`);
    await page.waitForSelector("#qc-cmp2-ui > div.qc-cmp2-footer.qc-cmp2-footer-overlay.qc-cmp2-footer-scrolled > div > button.css-47sehv")
    await page.click("#qc-cmp2-ui > div.qc-cmp2-footer.qc-cmp2-footer-overlay.qc-cmp2-footer-scrolled > div > button.css-47sehv")
    await page.waitForSelector("#title-result > div > div:nth-child(2) > div.fa-shadow-nb.item-search > div > div.mc-info-container > div.mc-title > a")
    await page.click("#title-result > div > div:nth-child(2) > div.fa-shadow-nb.item-search > div > div.mc-info-container > div.mc-title > a")
    await page.waitForSelector("#mt-content-cell > div:nth-child(6) > div > div.margin-ntabs > ul > li:nth-child(2) > a")
    await page.click("#mt-content-cell > div:nth-child(6) > div > div.margin-ntabs > ul > li:nth-child(2) > a")
    await page.waitForSelector("#mt-content-cell > div.moviecard-cont > div.reviews-wrapper > div:nth-child(1) > div.review-text1")
    const data = await page.evaluate(() => {
      const review = document.querySelector("div.review-text1");
      return review.innerText
    }); 
    return data
  }
}

module.exports = scraping

// #mt-content-cell > div.moviecard-cont > div.reviews-wrapper > div:nth-child(1) > div.review-text1
// #mt-content-cell > div.moviecard-cont > div.reviews-wrapper > div:nth-child(2) > div.review-text1

// nodelist = document.querySelectorAll("div.review-text1")
// let datos = [...nodelist]
// let comentarios = datos.map(peli=>peli.innerHTML)