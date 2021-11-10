const { Builder, By} = require('selenium-webdriver');
const { expect } = require('chai');

describe('Test blog menu', () => {
    const driver = new Builder().forBrowser('chrome').build();
    
    before(async () => {
        await driver.get('https://bisonapp.com/en/blog/');
        await driver.sleep(1000);
    });

    after(async () => driver.quit());

    it('should open archive of BISON-inside', async () => {
        await driver.findElement(By.xpath('//*[@id="categories-2"]/nav/ul/li[1]/a')).click();
        const pageTitle = await driver.findElement(By.xpath('//*[@id="primary"]/section/h1')).getText();

        expect(pageTitle).to.equal('BISON-inside');
    });

    it('should open archive of Knowledge', async () => {
        await driver.findElement(By.linkText('Knowledge')).click();
        // await driver.findElement(By.xpath('/html/body/div[1]/div[2]/div/div[2]/div/aside[1]/nav/ul/li[2]/a')).click();
        const pageTitle = await driver.findElement(By.xpath('//*[@id="primary"]/section/h1')).getText();

        expect(pageTitle).to.equal('Knowledge');
    });

    it('should open archive of The world of bitcoin', async () => {
        await driver.findElement(By.linkText('The World of Bitcoin')).click();
        // await driver.findElement(By.xpath('//*[@id="categories-2"]/nav/ul/li[3]/a')).click();
        const pageTitle = await driver.findElement(By.xpath('//*[@id="primary"]/section/h1')).getText();

        expect(pageTitle).to.equal('The World of Bitcoin');
    });
});