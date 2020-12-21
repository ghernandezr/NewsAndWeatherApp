import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiLanguageService } from 'ng-jhipster';

import { IWeather, Weather } from 'app/shared/model/weather.model';
import { WeatherService } from './weather.service';
import * as moment from 'moment';
import { ICity } from 'app/shared/model/city.model';
import { LocationService } from 'app/shared/components/location/location.service';

@Component({
  selector: 'jhi-weather',
  templateUrl: './weather.component.html',
})
export class WeatherComponent implements OnInit, OnDestroy {
  currentWeather?: IWeather;
  forecastWeather: IWeather[];
  eventSubscriber?: Subscription;

  city?: ICity;

  constructor(
    protected languajeService: JhiLanguageService,
    protected weatherService: WeatherService,
    protected eventManager: JhiEventManager,
    protected locationService: LocationService
  ) {
    this.forecastWeather = [];
  }

  loadAll(): void {
    if (this.city) {
      this.weatherService
        .query(this.city.name!, this.city.countryCode!.toLowerCase(), this.languajeService.currentLang)
        .subscribe((response: any) => {
          this.currentWeather = new Weather();
          this.currentWeather.date = moment();
          this.currentWeather.temp = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(response.main.temp - 273.15);
          this.currentWeather.icon = `http://openweathermap.org/img/w/${response.weather[0].icon}.png`;
          this.currentWeather.description = response.weather[0].description;
        });

      this.weatherService
        .forecast(this.city.name!, this.city.countryCode!.toLowerCase(), this.languajeService.currentLang)
        .subscribe((response: any) => {
          this.forecastWeather = [];
          if (response.list && response.list.length) {
            response.list.forEach((item: any) => {
              const fw = new Weather();
              fw.date = moment(item.dt_txt);
              fw.temp = new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(item.main.temp - 273.15);
              fw.icon = `http://openweathermap.org/img/w/${item.weather[0].icon}.png`;
              fw.description = item.weather[0].description;
              this.forecastWeather.push(fw);
            });
          }
        });
    }
  }

  // "http://openweathermap.org/img/w/" + iconcode + ".png"

  ngOnInit(): void {
    this.city = this.locationService.city;
    this.loadAll();
    this.registerChangeInWeathers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IWeather): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInWeathers(): void {
    // this.eventSubscriber = this.eventManager.subscribe('selectedCityChange', () => this.loadAll());
    this.locationService.cityChange.subscribe((city: ICity) => {
      this.city = city;
      this.loadAll();
    });
  }
}
