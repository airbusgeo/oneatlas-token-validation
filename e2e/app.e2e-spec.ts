import { TokenCheckerPage } from './app.po';

describe('token-checker App', function() {
  let page: TokenCheckerPage;

  beforeEach(() => {
    page = new TokenCheckerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('tc works!');
  });
});
