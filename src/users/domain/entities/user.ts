import { Document } from 'src/common/domain/entities/document';
import { Address } from './address';
import { Option, some, none } from 'fp-ts/lib/Option';

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
  ) {}

  public getMainAddress(): Option<Address> {
    const mainAddress = this.addresses.find((address) => address.main);

    if (mainAddress) return some(mainAddress);

    return none;
  }
}
