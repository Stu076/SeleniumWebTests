const { Builder, By} = require('selenium-webdriver');
const { expect } = require('chai');
const { checkIfImagesDirExistsAndMakeIt, saveImage } = require('../lib/images');

describe('Test blog menu', () => {
    const driver = new Builder().forBrowser('chrome').build();
    
    before(async () => {
        checkIfImagesDirExistsAndMakeIt();
        await driver.get('https://bisonapp.com/en/blog/');
    });

    after(async () => driver.quit());

    async function takeScreenshot(name) {
        await driver.takeScreenshot().then((image) => saveImage(name, image));
    }

    it('should open archive of BISON-inside', async () => {
        await driver.findElement(By.xpath('//*[@id="categories-2"]/nav/ul/li[1]/a')).click();
        const pageTitle = await driver.findElement(By.xpath('//*[@id="primary"]/section/h1')).getText();

        await takeScreenshot('bisonInside');

        expect(pageTitle).to.equal('BISON-inside');
    });

    it('should open archive of Knowledge', async () => {
        await driver.findElement(By.linkText('Knowledge')).click();
        const pageTitle = await driver.findElement(By.xpath('//*[@id="primary"]/section/h1')).getText();

        await takeScreenshot('knowledge');

        expect(pageTitle).to.equal('Knowledge');
    });

    it('should open archive of The world of bitcoin', async () => {
        await driver.findElement(By.linkText('The World of Bitcoin')).click();
        const pageTitle = await driver.findElement(By.xpath('//*[@id="primary"]/section/h1')).getText();

        await takeScreenshot('worldOfBTC');

        expect(pageTitle).to.equal('The World of Bitcoin');
    });
});