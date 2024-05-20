export class Address {
  public constructor(
    public city: string,
    public state: string,
    public street: string,
    public postalCode: string,
    public number: string,
    public complement: string,
    public neighborhood: string,
    public main: boolean,
  ) {}
}
