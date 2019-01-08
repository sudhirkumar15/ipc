import { TenantListingPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('tenantListing page ', () => {
    let tenantlistingpage: TenantListingPage;

    beforeEach(() => {
        tenantlistingpage = new TenantListingPage();
        browser.get('http://localhost:4200/tenantListing');
    });

    it('should navigate to tenantlistingpage', function () {
        const currentUrl = browser.driver.getCurrentUrl();
        console.log(currentUrl);
        browser.waitForAngular();
        expect(currentUrl).toMatch('http://localhost:4200/tenantListing');

    });

    it('should click on the  addtenant option & naviagte to addtenantpage', function () {
        browser.get('http://localhost:4200/tenantListing');
        element(by.css('app-side-panel>div:nth-of-type(1)>ul:nth-of-type(1)>li:nth-of-type(1)>div')).click();

        const addTenant = browser.driver.findElement(by.id('newTenant'));
        addTenant.click();
        browser.waitForAngular();
        const currentUrl = browser.driver.getCurrentUrl();
        expect(currentUrl).toMatch('http://localhost:4200/addtenant');

    });

    it('should fill the tenant details & tenant admin form ', function () {
        browser.get('http://localhost:4200/addtenant');
        const tenantName = browser.driver.findElement(by.id('tenantName'));
        const tenantadress = browser.driver.findElement(by.id('tenantAddress'));
        const state = element.all(by.css('.address-placeholder')).get(0);
        const pincode = element.all(by.css('.address-placeholder')).get(1);

        const tenantMailid = browser.driver.findElement(by.id('TenantEmail'));
        const primaryname = browser.driver.findElement(by.id('primaryName'));
        const officialmailid = browser.driver.findElement(by.id('official-id'));
        const officialphonenos = browser.driver.findElement(by.id('primaryPhno'));

        tenantName.sendKeys('ipshitaimpelsys123');
        tenantadress.sendKeys('balajilayot, munnenkollal, marathalli, banglore');
        state.sendKeys('karnataka');
        pincode.sendKeys('560071');
        tenantMailid.sendKeys('ippibrk@gmail.com');
        primaryname.sendKeys('ipi');
        officialmailid.sendKeys('ipsita.barik@gmail.com');
        officialphonenos.sendKeys('8895501163');
        const nextButton = browser.driver.findElement(by.id('next'));
        nextButton.click();
        const tenantadminpage = browser.driver.findElement(by.id('tenantAdmin'));
        const Adminname = browser.driver.findElement(by.id('adminName'));
        const phoneNoumber = browser.driver.findElement(by.id('tenantAdminPhno'));
        const emailAdress = browser.driver.findElement(by.id('adminEmail'));
        const adminpassword = browser.driver.findElement(by.id('adminPassword'));

        Adminname.sendKeys('Impelsys');
        phoneNoumber.sendKeys('7504960245');
        emailAdress.sendKeys('mmm@impelsys.com');
        adminpassword.sendKeys('saras');
        const Donebutton = browser.driver.findElement(by.id('tenantCreated'));
        Donebutton.click();

    });


});

