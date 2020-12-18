import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CityComponentsPage, CityDeleteDialog, CityUpdatePage } from './city.page-object';

const expect = chai.expect;

describe('City e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let cityComponentsPage: CityComponentsPage;
  let cityUpdatePage: CityUpdatePage;
  let cityDeleteDialog: CityDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Cities', async () => {
    await navBarPage.goToEntity('city');
    cityComponentsPage = new CityComponentsPage();
    await browser.wait(ec.visibilityOf(cityComponentsPage.title), 5000);
    expect(await cityComponentsPage.getTitle()).to.eq('cityNewsAndWeatherApp.city.home.title');
    await browser.wait(ec.or(ec.visibilityOf(cityComponentsPage.entities), ec.visibilityOf(cityComponentsPage.noResult)), 1000);
  });

  it('should load create City page', async () => {
    await cityComponentsPage.clickOnCreateButton();
    cityUpdatePage = new CityUpdatePage();
    expect(await cityUpdatePage.getPageTitle()).to.eq('cityNewsAndWeatherApp.city.home.createOrEditLabel');
    await cityUpdatePage.cancel();
  });

  it('should create and save Cities', async () => {
    const nbButtonsBeforeCreate = await cityComponentsPage.countDeleteButtons();

    await cityComponentsPage.clickOnCreateButton();

    await promise.all([cityUpdatePage.setNameInput('name'), cityUpdatePage.setCountryCodeInput('countryCode')]);

    expect(await cityUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await cityUpdatePage.getCountryCodeInput()).to.eq('countryCode', 'Expected CountryCode value to be equals to countryCode');

    await cityUpdatePage.save();
    expect(await cityUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await cityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last City', async () => {
    const nbButtonsBeforeDelete = await cityComponentsPage.countDeleteButtons();
    await cityComponentsPage.clickOnLastDeleteButton();

    cityDeleteDialog = new CityDeleteDialog();
    expect(await cityDeleteDialog.getDialogTitle()).to.eq('cityNewsAndWeatherApp.city.delete.question');
    await cityDeleteDialog.clickOnConfirmButton();

    expect(await cityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
