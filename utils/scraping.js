const puppeteer = require("puppeteer");

const scrap = async (titulo) => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
    await page.goto(`https://www.sensacine.com/buscar/?q=${titulo}`);
    await page.waitForSelector("#didomi-notice-agree-button")
    await page.click("#didomi-notice-agree-button")
    await page.waitForSelector("#content-layout > div.section-wrap.gd-2-cols.gd-gap-30.row-col-sticky > div > section.section.movies-results > ul > li:nth-child(1) > div > div.meta > h2 > a")
    await page.click("#content-layout > div.section-wrap.gd-2-cols.gd-gap-30.row-col-sticky > div > section.section.movies-results > ul > li:nth-child(1) > div > div.meta > h2 > a")
    const data = await page.evaluate(() => {
        const review = document.querySelector("div.content-txt.review-card-content");
        // console.log(review)
        return review.innerText
    }); 
    console.log(data)
    return data
    // await page.waitForSelector('#content-layout > div.section-wrap.gd-2-cols.gd-gap-30.row-col-sticky > div > section.section.movies-results > ul > li:nth-child(1) > div > div.rating-holder.rating-holder-4 > div:nth-child(2) > div > a')
    // await page.click('#content-layout > div.section-wrap.gd-2-cols.gd-gap-30.row-col-sticky > div > section.section.movies-results > ul > li:nth-child(1) > div > div.rating-holder.rating-holder-4 > div:nth-child(2) > div > a');
    // const data = await page.evaluate(() => {
    //     const review = document.querySelector("div.titlebar.titlebar-page > div.titlebar-title.titlebar-title-lg > a");
    //     // console.log(review)
    //     return {
    //         review
    //     }
    // }); 
    // return data.innerText
}
scrap("hulk")

module.exports = scrap;

//   await page.waitForTimeout(1000).then(() => console.log('Waited a second!'));
//   const data = await page.evaluate(() => {
//     const link = document.querySelector("#content-layout > div.section-wrap.gd-2-cols.gd-gap-30.row-col-sticky > div > section.section.movies-results > ul > li:nth-child(1) > div > div.rating-holder.rating-holder-4 > div:nth-child(2) > div > a")
//     const review = document.querySelector("div.content-txt.review-card-content").innerText;
//     return {
//       review
//     }
//   });  
//   await browser.close();
//   return data

