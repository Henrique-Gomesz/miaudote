import { Document } from 'src/common/entities/document';

export class User {
  public constructor(
    public name: string,
    public document: Document,
    public password: string,
    public email: string,
    public phone: string,
    public about: string,
    public image: string,
    public birthday: Date,
  ) {}
}
