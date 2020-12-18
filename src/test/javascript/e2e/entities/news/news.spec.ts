import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { NewsComponentsPage, NewsDeleteDialog, NewsUpdatePage } from './news.page-object';

const expect = chai.expect;

describe('News e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let newsComponentsPage: NewsComponentsPage;
  let newsUpdatePage: NewsUpdatePage;
  let newsDeleteDialog: NewsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load News', async () => {
    await navBarPage.goToEntity('news');
    newsComponentsPage = new NewsComponentsPage();
    await browser.wait(ec.visibilityOf(newsComponentsPage.title), 5000);
    expect(await newsComponentsPage.getTitle()).to.eq('cityNewsAndWeatherApp.news.home.title');
    await browser.wait(ec.or(ec.visibilityOf(newsComponentsPage.entities), ec.visibilityOf(newsComponentsPage.noResult)), 1000);
  });

  it('should load create News page', async () => {
    await newsComponentsPage.clickOnCreateButton();
    newsUpdatePage = new NewsUpdatePage();
    expect(await newsUpdatePage.getPageTitle()).to.eq('cityNewsAndWeatherApp.news.home.createOrEditLabel');
    await newsUpdatePage.cancel();
  });

  it('should create and save News', async () => {
    const nbButtonsBeforeCreate = await newsComponentsPage.countDeleteButtons();

    await newsComponentsPage.clickOnCreateButton();

    await promise.all([
      newsUpdatePage.setAuthorIdInput('authorId'),
      newsUpdatePage.setTitleInput('title'),
      newsUpdatePage.setDescriptionInput('description'),
      newsUpdatePage.setCityIdInput('cityId'),
      newsUpdatePage.setCreateAtInput('2000-12-31'),
    ]);

    expect(await newsUpdatePage.getAuthorIdInput()).to.eq('authorId', 'Expected AuthorId value to be equals to authorId');
    expect(await newsUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    expect(await newsUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await newsUpdatePage.getCityIdInput()).to.eq('cityId', 'Expected CityId value to be equals to cityId');
    expect(await newsUpdatePage.getCreateAtInput()).to.eq('2000-12-31', 'Expected createAt value to be equals to 2000-12-31');

    await newsUpdatePage.save();
    expect(await newsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await newsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last News', async () => {
    const nbButtonsBeforeDelete = await newsComponentsPage.countDeleteButtons();
    await newsComponentsPage.clickOnLastDeleteButton();

    newsDeleteDialog = new NewsDeleteDialog();
    expect(await newsDeleteDialog.getDialogTitle()).to.eq('cityNewsAndWeatherApp.news.delete.question');
    await newsDeleteDialog.clickOnConfirmButton();

    expect(await newsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
