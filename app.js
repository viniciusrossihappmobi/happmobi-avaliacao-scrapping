const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('http://interno.happmobi/Happmobi_HAPP/HAPP000_Repositorio/converter-avaliacao/');
    await page.type('.input-text', process.argv[2]);
    await page.click('.btn');
    await page.waitForSelector('#out');
    await page.waitForFunction('document.querySelector(\'#out\').value.includes(\'<avaliacao>\')');
    const data = await page.evaluate(() => {
        // eslint-disable-next-line no-undef
        return document.querySelector('#out').value;
    });

    fs.writeFile('avaliacao.xml', data, (error) => {
        if (error) console.log(error);
    });

    await browser.close();
})();
