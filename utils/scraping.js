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
      // console.log(review)
      return review.innerText
    }); 
    console.log(data)
     return data
    // console.log('******')
    // console.log(imdb)
    // const scrapJSON = {
    //   "review": JSON.stringify(data)
    // }
    // console.log(scrapJSON)
    // let options = {
    //   method: "POST",
    //   headers: {
    //       'Content-Type': 'application/json'
    //       },
    //   body: JSON.stringify(scrapJSON)
    // }
    // console.log(options);
    // let response = await fetch(`http://localhost:3000/search/${imdb}`, options)
    // let dataPost = await response.json()
    // console.log(dataPost)
  }
}

//scraping.scrap("spiderman")

module.exports = scraping

// #mt-content-cell > div.moviecard-cont > div.reviews-wrapper > div:nth-child(1) > div.review-text1
// #mt-content-cell > div.moviecard-cont > div.reviews-wrapper > div:nth-child(2) > div.review-text1