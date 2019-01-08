import { LoginPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('', () => {
let logpage: LoginPage;

beforeEach(() => {
logpage = new LoginPage();
browser.get('http://localhost:4200/login');
});

it('should navigate to  login page', function() {
const currentUrl = browser.driver.getCurrentUrl();
console.log(currentUrl);
 expect(currentUrl).toMatch('http://localhost:4200/login');
});


it('should sign in', function() {
browser.waitForAngular();


browser.manage().timeouts().pageLoadTimeout(40000);
// browser.manage().timeouts().implicitlyWait(25000);
const userNameField = browser.driver.findElement(by.id('yourName'));
const userPassField = browser.driver.findElement(by.id('pasword'));
 // element(by.css('button'))

userNameField.sendKeys('test_tenant@impelsys.com');
userPassField.sendKeys('Impelsys1');
const userLoginBtn  = browser.driver.findElement(by.id('logInBtn'));
userLoginBtn.click();
browser.waitForAngular();
const baseUrl = 'http://localhost:4200';
expect( browser.getCurrentUrl()).toEqual( baseUrl + '/tenantListing');


	 /* userLoginBtn.click()(function() {
        browser.waitForAngular();
        expect(browser.driver.getCurrentUrl()).toMatch('/tenantListing');
     }, 10000);*/
});


	/* expect(userNameField.getAttribute('value')).toEqual('saras');
      expect(userPassField.getAttribute('value')).toEqual('impelsys');*/

	  /*userLoginBtn.click().then(function() {
        browser.waitForAngular();
        expect(browser.driver.getCurrentUrl()).toMatch('/tenantListing');
     }, 10000);*/

		/*browser.get('http://localhost:4200/login');
		return browser.driver.wait(function() {
			return browser.driver.getCurrentUrl().then(function (url) {
				console.log(url)
				var userNameField = browser.driver.findElement(by.id('yourName'));
				return url.indexOf('localhost') > -1;
				return '123';*/

		/*}, 5000);*/

browser.get('http://localhost:4200/');
const EC = browser.ExpectedConditions;
const getStarted = element(by.css('button'));
browser.wait(EC.elementToBeClickable(getStarted), 20000);
getStarted.click();




});


