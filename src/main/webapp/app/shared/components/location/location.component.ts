import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { ICity } from 'app/shared/model/city.model';
import { CityService } from 'app/entities/city/city.service';
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
  constructor(private cityService: CityService, private fb: FormBuilder) {
    this.cities = [];
  }

  ngOnInit(): void {}

  loadAllCities(): void {
    // this.cityService.
  }
}
