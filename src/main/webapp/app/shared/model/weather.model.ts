import { Moment } from 'moment';

export interface IWeather {
  id?: string;
  temp?: string;
  description?: string;
  date?: Moment;
  icon?: string;
}

export class Weather implements IWeather {
  constructor(public id?: string, public temp?: string, public description?: string, public date?: Moment, public icon?: string) {}
}
