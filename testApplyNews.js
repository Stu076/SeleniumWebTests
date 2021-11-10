const { Builder, By } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Test apply to news letter', () => {
    const driver = new Builder().forBrowser('chrome').build();

    it('should apply to the newsletter', async () => {
        await driver.manage().setTimeouts({ implicit: 10000 });

        await driver.get('https://10minutemail.com');
        const emailElement = await driver.findElement(By.id('mail_address'));
        await driver.sleep(1000);
        var email = await emailElement.getAttribute('value');
        console.log('email: ' + email);
        // await driver.sleep(1000);

        
        await driver.get('https://bisonapp.com/en/');
        const cookies = await driver.findElement(By.linkText('Accept all cookies'));
        if (cookies) await cookies.click();
        await driver.sleep(1000);
        await driver.executeScript('window.scrollTo(0, document.body.scrollHeight)');
        await driver.sleep(1000);

        // await driver.findElement(
        //     By.xpath('//*[@id="page"]/div[3]/div/section[1]/div/div/div/div/div/section/div/div/div[5]/div/div/div[2]/div/div/div/div/div/section/div/div/div/div/div/div/div/form/div[1]/input')    
        // ).sendKeys('Test');

        await driver.findElement(By.name('newsletter-name')).sendKeys('test');
        await driver.sleep(1000);
        // await driver.findElement(
        //     By.xpath('//*[@id="page"]/div[3]/div/section[1]/div/div/div/div/div/section/div/div/div[5]/div/div/div[2]/div/div/div/div/div/section/div/div/div/div/div/div/div/form/div[2]/input')
        // ).sendKeys(email);
        await driver.findElement(By.name('newsletter-email')).sendKeys(email);
        await driver.sleep(1000);
        await driver.findElement(By.css('input[type="checkbox"]#newsletter-chk-1:not(label)')).click();
        // await driver.findElement(By.xpath('//*@id="newsletter-chk-1"')).click();
        await driver.sleep(1000);
        
        await driver.findElement(By.css('input[type="checkbox"]#newsletter-chk-2:not(label)')).click();
        // await driver.findElement(By.xpath('//*@id="newsletter-chk-2"')).click();
        await driver.sleep(1000);
        await driver.findElement(By.css('div.input-container>button')).click();
        // await driver.findElement(
        //     By.xpath('//*[@id="page"]/div[3]/div/section[1]/div/div/div/div/div/section/div/div/div[5]/div/div/div[2]/div/div/div/div/div/section/div/div/div/div/div/div/div/form/div[5]/button')
        // ).click();
        await driver.sleep(1000);

        await driver.get('https://10minutemail.com');
        await driver.sleep(1000);
        const subject = await driver.findElement(By.xpath('//*[@id="mail_messages_content"]/div[2]/div[1]/div[3]/span')).getText();

        expect(subject).to.equal('BISONews - Confirm your subsrciption!');
    });

    after(async () => driver.quit());
});