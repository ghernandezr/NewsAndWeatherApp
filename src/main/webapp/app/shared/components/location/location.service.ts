import { EventEmitter, Injectable } from '@angular/core';
import { ICity } from 'app/shared/model/city.model';

@Injectable({ providedIn: 'root' })
export class LocationService {
  cityChange: EventEmitter<ICity> = new EventEmitter();
  city?: ICity;
  constructor() {}

  changeCity(city: ICity): void {
    this.city = city;
    this.cityChange.emit(this.city);
  }
}
