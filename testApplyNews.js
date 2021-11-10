const { Builder, By, Key} = require('selenium-webdriver');
const { expect } = require('chai');

describe('Test apply to news letter', () => {
    const driver = new Builder().forBrowser('chrome').build();

    async function takeScreenshot(name) {
        await driver.takeScreenshot().then(
            (image) => {
                require('fs').writeFileSync('images/' + name + '.png', image, 'base64', (err) => {
                    console.log(err);
                });
            }
        );
    }

    it('should apply to the newsletter', async () => {
        await driver.manage().setTimeouts({ implicit: 10000 });

        await driver.get('https://10minutemail.com');
        await takeScreenshot('applynews2');
        const emailElement = await driver.findElement(By.id('mail_address'));
        var email = await emailElement.getAttribute('value');
        
        await driver.get('https://bisonapp.com/en/');
        const cookies = await driver.findElement(By.linkText('Accept all cookies'));
        if (cookies) await cookies.click();

        await driver.executeScript('window.scrollTo(0, document.body.scrollHeight)');
        await driver.sleep(1000);

        await driver.findElement(By.name('newsletter-name')).sendKeys('test');

        await driver.findElement(By.name('newsletter-email')).sendKeys(email);

        await driver.findElement(
            By.xpath('//*[@id="page"]/div[3]/div/section[1]/div/div/div/div/div/section/div/div/div[5]/div/div/div[2]/div/div/div/div/div/section/div/div/div/div/div/div/div/form/div[3]')
        ).click();
        
        await driver.findElement(
            By.xpath('//*[@id="page"]/div[3]/div/section[1]/div/div/div/div/div/section/div/div/div[5]/div/div/div[2]/div/div/div/div/div/section/div/div/div/div/div/div/div/form/div[4]')
        ).click();

        await takeScreenshot('applynews2');

        await driver.executeScript('document.querySelector("div.input-container>button").click()');
        await driver.sleep(1000);
        await takeScreenshot('applynews3');
        await driver.sleep(90000); // mandatory timing

        await driver.get('https://10minutemail.com');
        await takeScreenshot('applynews4');
        // const subject = await driver.findElement(By.xpath('//*[@id="mail_messages_content"]/div[2]/div[1]/div[3]/span')).getText();
        const subject = await driver.findElement(By.className('small_subject')).getText();
        
        expect(subject).to.equal('BISONews - Confirm your subsrciption!');
    });

    after(async () => driver.quit());
});