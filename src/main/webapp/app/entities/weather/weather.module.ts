import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CityNewsAndWeatherSharedModule } from 'app/shared/shared.module';
import { WeatherComponent } from './weather.component';
import { WeatherDetailComponent } from './weather-detail.component';
import { weatherRoute } from './weather.route';
import { WeatherCardComponent } from './weather-card/weather-card.component';

@NgModule({
  imports: [CityNewsAndWeatherSharedModule, RouterModule.forChild(weatherRoute)],
  declarations: [WeatherComponent, WeatherDetailComponent, WeatherCardComponent],
})
export class CityNewsAndWeatherWeatherModule {}
