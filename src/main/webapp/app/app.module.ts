import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { CityNewsAndWeatherSharedModule } from 'app/shared/shared.module';
import { CityNewsAndWeatherCoreModule } from 'app/core/core.module';
import { CityNewsAndWeatherAppRoutingModule } from './app-routing.module';
import { CityNewsAndWeatherHomeModule } from './home/home.module';
import { CityNewsAndWeatherEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CityNewsAndWeatherSharedModule,
    CityNewsAndWeatherCoreModule,
    CityNewsAndWeatherHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    CityNewsAndWeatherEntityModule,
    CityNewsAndWeatherAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent],
})
export class CityNewsAndWeatherAppModule {}
