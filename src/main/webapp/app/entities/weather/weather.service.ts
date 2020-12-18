import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IWeather } from 'app/shared/model/weather.model';

type EntityResponseType = HttpResponse<IWeather>;
type EntityArrayResponseType = HttpResponse<IWeather[]>;

@Injectable({ providedIn: 'root' })
export class WeatherService {
  public resourceUrl = 'https://community-open-weather-map.p.rapidapi.com';

  constructor(protected http: HttpClient) {}

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IWeather>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(city: string, countryCode: string, lang: string): Observable<Promise<Response>> {
    return new Observable(observer => {
      // Make use of Fetch API to get data from URL
      fetch(`${this.resourceUrl}/weather?q=${city}%2C${countryCode}&lang=${lang}`, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '8dd3aeb817msh8dddeff14c33cd2p15c956jsn939b49bc101e',
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        },
      })
        .then(res => {
          /* The response.json() doesn't return json, it returns a "readable stream" which is a promise which needs to be resolved to get the actual data.*/
          return res.json();
        })
        .then(body => {
          observer.next(body);
          /* Complete the Observable as it won't produce any more event */
          observer.complete();
        })
        // Handle error
        .catch(err => observer.error(err));
    });
  }

  forecast(city: string, countryCode: string, lang: string): Observable<any> {
    return new Observable(observer => {
      fetch(`${this.resourceUrl}/forecast?q=${city}%2C${countryCode}&lang=${lang}`, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '8dd3aeb817msh8dddeff14c33cd2p15c956jsn939b49bc101e',
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        },
      })
        .then(res => {
          /* The response.json() doesn't return json, it returns a "readable stream" which is a promise which needs to be resolved to get the actual data.*/
          return res.json();
        })
        .then(body => {
          observer.next(body);
          /* Complete the Observable as it won't produce any more event */
          observer.complete();
        })
        // Handle error
        .catch(err => observer.error(err));
    });
  }
}
