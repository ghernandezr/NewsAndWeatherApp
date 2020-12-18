export interface IAuthor {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
}

export class Author implements IAuthor {
  constructor(public id?: string, public name?: string, public email?: string, public phone?: string) {}
}
