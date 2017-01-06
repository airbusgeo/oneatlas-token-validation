import { browser, element, by } from 'protractor';

export class TokenCheckerPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('tc-root h1')).getText();
  }
}
