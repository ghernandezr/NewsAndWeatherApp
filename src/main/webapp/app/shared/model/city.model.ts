export interface ICity {
  id?: string;
  name?: string;
  countryCode?: string;
}

export class City implements ICity {
  constructor(public id?: string, public name?: string, public countryCode?: string) {}
}
