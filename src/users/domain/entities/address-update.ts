export class UpdateAddress {
  public constructor(
    public id: number,
    public postalCode: string,
    public city: string,
    public state: string,
    public main: boolean,
    public street: string,
    public number: string,
    public neighborhood: string,
    public complement?: string,
  ) {}
}