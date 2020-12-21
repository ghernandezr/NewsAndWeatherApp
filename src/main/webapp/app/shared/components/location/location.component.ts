import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { ICity } from 'app/shared/model/city.model';
import { CityService } from 'app/entities/city/city.service';
import { LocationService } from './location.service';
@Component({
  selector: 'jhi-location-selector',
  templateUrl: 'location.component.html',
  styleUrls: ['location.component.scss'],
})
export class LocationComponent implements OnInit {
  cities: ICity[];
  locationForm = this.fb.group({
    city: [],
  });
  constructor(private cityService: CityService, private fb: FormBuilder, private locationService: LocationService) {
    this.cities = [];
  }

  ngOnInit(): void {
    this.loadAllCities();
    this.registerListerOnCityChange();
  }

  registerListerOnCityChange(): void {
    this.locationForm.get(['city'])?.valueChanges.subscribe((cityId: string) => {
      const selectedCity = this.cities.find(city => city.id === cityId);
      if (selectedCity) {
        this.locationService.changeCity(selectedCity);
      }
    });
  }

  loadAllCities(): void {
    this.cityService.findAll().subscribe((response: HttpResponse<ICity[]>) => {
      this.cities = response.body!;
      if (this.cities && this.cities.length) {
        this.locationForm.get(['city'])!.setValue(this.cities[0].id);
        // this.locationService.changeCity(this.cities[0]);
      }
    });
  }
}
