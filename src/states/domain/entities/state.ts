import { isEqual } from 'lodash';

export class State {
  public constructor(
    public name: string,
    public acronym: string,
    public cities: string[],
  ) {}

  public getCityByName(name: string): string | undefined {
    const city = this.cities.find((city) => isEqual(name, city));

    if (city) return city;

    return undefined;
  }
}
