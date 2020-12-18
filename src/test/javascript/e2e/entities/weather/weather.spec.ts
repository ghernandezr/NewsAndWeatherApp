import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { WeatherComponentsPage } from './weather.page-object';

const expect = chai.expect;

describe('Weather e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let weatherComponentsPage: WeatherComponentsPage;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Weathers', async () => {
    await navBarPage.goToEntity('weather');
    weatherComponentsPage = new WeatherComponentsPage();
    await browser.wait(ec.visibilityOf(weatherComponentsPage.title), 5000);
    expect(await weatherComponentsPage.getTitle()).to.eq('cityNewsAndWeatherApp.weather.home.title');
    await browser.wait(ec.or(ec.visibilityOf(weatherComponentsPage.entities), ec.visibilityOf(weatherComponentsPage.noResult)), 1000);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
