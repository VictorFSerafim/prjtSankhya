const puppeteer =require('puppeteer');

(async ()=>{
    // 
    const browser =await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    // await page.goto('https://instagram.com/rocketseat_oficial');

    // document.querySelector('sk-search').shadowRoot.querySelectorAll('.resulLine')

    await page.evaluate(()=>{
        const nodeList=document.querySelector('sk-search').shadowRoot.querySelectorAll('.resulLine');
        const textArray=[...nodeList];

        const list=textArray.map((name)=>({
            name
        }));

        console.log(nodeList);
    })
})();
