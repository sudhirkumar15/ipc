import { HomePage } from './app.po';
import { browser, by, element } from 'protractor';

describe('Impelsys.inc ', () => {
   let homepage: HomePage;

beforeEach(() => {
homepage = new HomePage();
browser.get('http://localhost:4200');
});


it('should navigate to  home page', function() {
browser.waitForAngular();
browser.manage().timeouts().pageLoadTimeout(200000);
const currentUrl = browser.driver.getCurrentUrl();
console.log(currentUrl);

expect(currentUrl).toMatch('http://localhost:4200');

});


it('should fill sign-up form ', function() {
browser.waitForAngular();
browser.manage().timeouts().pageLoadTimeout(200000);


const userName = browser.driver.findElement(by.id('yourName'));
const phoneNos = browser.driver.findElement(by.id('phoneNumber'));
const emailId  = browser.driver.findElement(by.id('workEmail'));
const password = browser.driver.findElement(by.id('choosePasword'));

browser.waitForAngular();
browser.manage().timeouts().pageLoadTimeout(200000);

userName.sendKeys('server123');
phoneNos.sendKeys('9945517392');
emailId.sendKeys('rac12@impelsys.com');
password.sendKeys ('impelsys1');

const SignupButton  = browser.driver.findElement(by.id('signUpBtn'));
SignupButton.click();
const url = 'http://localhost:4200';
browser.getCurrentUrl().then(function (Url) {
browser.get(Url + '/tenantListing');
});

	 /*browser.get("http://localhost:4200/tenantListing");
	 browser.waitForAngular();*/
});

	/*browser.get('http://localhost:4200');
	it('should wait 5 seconds', function() {
	 	return browser.driver.wait(function() {
	 		var EC = browser.ExpectedConditions;
	 			var getStarted = element(by.css('button'));
				browser.wait(EC.elementToBeClickable(getStarted), 1000);
				getStarted.click();
	 			return expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/tenantListing');
 	}, 1000);
	 });*/




	/*it('should click button...', function() {
		var EC = browser.ExpectedConditions;
		var getStarted = element(by.css('button'));
		browser.wait(EC.elementToBeClickable(getStarted), 1000);
		getStarted.click();

	});*/


	/*it('should wait 5 seconds and check url', function() {
		return browser.driver.wait(function() {
			return expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/tenantListing');
		}, 40000);
	});*/

browser.get('http://localhost:4200');
const EC = browser.ExpectedConditions;
const getStarted = element(by.css('button'));
browser.wait(EC.elementToBeClickable(getStarted), 60000);
getStarted.click();


});
