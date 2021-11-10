const { Builder, By, Key, promise} = require('selenium-webdriver');
const { expect } = require('chai');

describe('Test FAQ filter', () => {
    const driver = new Builder().forBrowser('chrome').build();
    const shouldBeDisplayedIds = [
        '-which-cryptocurrencies-can-i-buy-and-sell-with-bison',
        '-can-i-take-a-short-position-on-cryptocurrencies-with-bison',
        '-do-i-have-to-buy-a-whole-unit-of-a-cryptocurrency-at-a-time',
        'what-do-i-have-to-consider-when-paying-out-my-cryptocurrencies',
        'what-is-sentimentbuzz',
        'what-are-bitcoin-bitcoin-cash-ethereum-litecoin-and-ripple-xrp'
    ];

    it('should filter out the questions/answers that contain bitcoin', async () => {
        await driver.get('https://bisonapp.com/en/questions');
        await driver.sleep(1000);

        await driver.findElement(By.id('faq-search')).sendKeys('bitcoin', Key.ENTER);
        const searchElements = await driver.findElement(By.xpath('//*[@id="post-98"]/div/div/div/div/section[2]/div/div'))
                                           .findElements(By.css('div.eael-accordion-list:not(.hidden)>div.elementor-tab-title.eael-accordion-header'));
        
        var gotIds = [];
        await promise.map(searchElements, element => element.getAttribute('id'))
        .then(function (ids) {
            gotIds = ids;
        });

        expect(gotIds).to.eql(shouldBeDisplayedIds);
    });

    after(async () => driver.quit());
});