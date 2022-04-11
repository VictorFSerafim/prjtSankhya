const puppeteer = require('puppeteer');
const fs=require('fs');

// e, devtools: true
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/');

  await page.waitFor(2000);
  
  await page.type('[name=campoBusca]','água');

  const allResultsSelector='.my-input-textbox';

  await page.waitForSelector(allResultsSelector);

  await page.click('[name=botaoBusca]');
  
  const resultsSelector='.resulLine';

  await page.waitForSelector(resultsSelector);

 const links = await page.evaluate((resultsSelector) => {
    const anchors = Array.from(document.querySelectorAll(resultsSelector));
    return anchors.map((anchor) => {
      const title = anchor.textContent.split('|')[0].trim();
      return `${title}`;
    });
  }, resultsSelector);

  fs.writeFile('resultadoPesquisa.json',JSON.stringify(links,null,2),err=>{
      if(err) throw new Error('wrong')
  })

//   await browser.close();

})();

