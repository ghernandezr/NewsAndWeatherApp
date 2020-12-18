import { Moment } from 'moment';

export interface INews {
  id?: string;
  authorId?: string;
  title?: string;
  description?: string;
  cityId?: string;
  createAt?: Moment;
}

export class News implements INews {
  constructor(
    public id?: string,
    public authorId?: string,
    public title?: string,
    public description?: string,
    public cityId?: string,
    public createAt?: Moment
  ) {}
}
