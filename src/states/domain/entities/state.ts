import { Option, some, none } from 'fp-ts/lib/Option';
import { isEqual } from 'lodash';

export class State {
  public constructor(
    public name: string,
    public acronym: string,
    public cities: string[],
  ) {}

  public getCityByName(name: string): Option<string> {
    const city = this.cities.find((city) => isEqual(name, city));

    if (city) return some(city);

    return none;
  }
}
