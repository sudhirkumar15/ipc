import { browser, by, element } from 'protractor';

export class LoginPage {
  navigateTo() {
    return browser.get('/');
  }
   navigateToHome() {
    return browser.get('/');
  }
  getParagraphText() {
    return element(by.css('p')).getText();
  }

  getParagraphText1() {
    return element(by.css('app-login>div:nth-of-type(1)>p')).getText();
  }
}

export class HomePage  {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-body p')).getText();
  }
}

export class AboutPage  {
  navigateTo() {
    return browser.get('/about');
  }


  getParagraphText() {
    return element(by.css('p')).getText();
  }
  }

  export class ContactPage  {
  navigateTo() {
  return browser.get('/contact');
  }

 getParagraphText() {
    return element(by.css('p')).getText();
 }

}
export class TenantListingPage {
  navigateTo() {
    return browser.get('/');
  }
   navigateToHome() {
    return browser.get('/');
  }
  getParagraphText() {
    return element(by.css('h1')).getText();
  }
}
