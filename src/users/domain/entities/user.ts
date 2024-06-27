import { Document } from 'src/common/domain/entities/document';
import { Address } from './address';

export class User {
  public constructor(
    public name: string,
    public document: Document,
    public password: string,
    public email: string,
    public phone: string,
    public birthday: Date,
    public addresses: Address[],
    public about?: string,
    public image?: string,
    public id?: string,
  ) {}

  public getMainAddress(): Address | undefined {
    const mainAddress = this.addresses.find((address) => address.main);

    if (mainAddress) return mainAddress;

    return undefined;
  }
}
