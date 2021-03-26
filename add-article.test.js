const puppeteer = require('puppeteer');
let page;
let browser;

describe('Add content to your profile', () => {
  describe('Article', () => {
    it('adds an article with a title to user profile', async () => {
      // create new browser instance and open new page
      browser = await puppeteer.launch({headless : false});
      page = await browser.newPage();

      // sign in
      await page.goto('https://degreed.com/');
      const selectorSignInButton = '#__next > header > nav > div > div.NavBarStyles__MobileMenu-l1wk1x-4.dyBcFj > div > div.NavBarStyles__BtnWrapper-l1wk1x-6.jZGsUD > ul > li:nth-child(1) > a';
      await page.$(selectorSignInButton);
      page.click(selectorSignInButton);
      const selectorUsername = '#username';
      const selectorPassword = '#password';
      const username = 'conbon9379@sudomail.com';
      const password = 'Assignment1!';
      await page.waitForSelector(selectorUsername);
      await page.type(selectorUsername, username);
      await page.click('button[type="submit"]');
      await page.waitForSelector(selectorPassword);
      await page.type(selectorPassword, password);
      await page.click('button[type="submit"]');

      // find number of articles currently
      const selectorProfile = 'body > div.l_max-screen > dg-app-header > div > header > nav > div.app-header__nav.dg-animate.ng-scope > ul > li.tabnav__item.app-header__profile.ng-scope';
      const selectorCollection = '#main > dgx-root > dgx-ajs-icon-loader > dg-profile > div > div.grid > div > nav > div > ng-transclude > ul > li:nth-child(2)'; //'#main > dgx-root > dgx-ajs-icon-loader > dg-profile > div > div.grid > div > nav > div > ng-transclude > ul > li.tabnav__item.ng-scope.is_active > a';
      const selectorTypeDropDownMenu =  '#-button';
      const xPathArticleMenuItem = '/html/body/div[1]/div/div/main/dgx-root/dgx-ajs-icon-loader/dg-profile/div/div[3]/div/dg-profile-collection/div[1]/div[1]/div/div/div/div/dg-facet-filter/div/ng-transclude/div[1]/div/fieldset[2]/div[1]';
      try {
        await page.waitForSelector(selectorProfile, {visible:true});
      } catch {
        //profile button selector not detected. this try catch block is inserted in attempt to fix asynchronous callback issue
      }
      await page.click(selectorProfile, {delay:1000});
      await page.waitForSelector(selectorCollection, {visible:true});
      await page.click(selectorCollection, {delay:1000});
      await page.waitForSelector(selectorTypeDropDownMenu, {visible:true});
      await page.click(selectorTypeDropDownMenu, {delay:1000});
      let elementHandleArticleItem = await page.waitForXPath(xPathArticleMenuItem);
      let text = await page.evaluate(el => el.textContent, elementHandleArticleItem);
      let numberOfArticlesTextInitial = text.match(/\d+/)[0];
      let numberOfArticlesIntegerInitial = parseInt(numberOfArticlesTextInitial);
      
      // add one article
      const selectorAddContent = '#globalSearchNextItem';
      await page.waitForSelector(selectorAddContent);
      await page.click(selectorAddContent, {delay: 1000});
      const selectorArticle = '#dgat-globalAdd-0';
      await page.waitForSelector(selectorArticle, {visible:true});
      await page.click(selectorArticle, {delay:1000});
      const selectorProposedUrl = '#proposedUrl';
      let randomString = Math.random().toString().substr(0, 6);
      const randomUrl = 'https://www' + randomString + '.com';
      await page.waitForSelector(selectorProposedUrl, {visible:true});
      await page.type(selectorProposedUrl, randomUrl);
      await page.click('button[type="submit"]');
      const selectorTitle = '#title';
      try {
        await page.waitForSelector(selectorTitle);
        await page.type(selectorTitle, randomString);
      } catch {
        // a title has already been autopopulated
      }
      const selectorSubmitArticle = '#dgat-globalAddSuccess-submit';
      await page.waitForSelector(selectorSubmitArticle, {visible:true});
      await page.click(selectorSubmitArticle);
      await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });

      // find number of articles again
      await page.waitForSelector(selectorProfile, {visible:true});
      await page.click(selectorProfile, {delay:1000});
      await page.waitForSelector(selectorCollection, {visible:true});
      await page.click(selectorCollection, {delay:1000});
      await page.waitForSelector(selectorTypeDropDownMenu, {visible:true});
      await page.click(selectorTypeDropDownMenu, {delay:1000});
      elementHandleArticleItem = await page.waitForXPath(xPathArticleMenuItem);
      text = await page.evaluate(el => el.textContent, elementHandleArticleItem);
      numberOfArticlesTextFinal = text.match(/\d+/)[0];
      numberOfArticlesIntegerFinal = parseInt(numberOfArticlesTextFinal);

      // console.log(numberOfArticlesIntegerInitial + 1 == numberOfArticlesIntegerFinal);
      expect(numberOfArticlesIntegerFinal).toEqual(numberOfArticlesIntegerInitial + 1);

      await browser.close();
    })
})
})