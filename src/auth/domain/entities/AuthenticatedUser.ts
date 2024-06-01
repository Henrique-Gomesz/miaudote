export class UserPayload {
  constructor(
    public readonly id: string,
    public readonly iat: number,
    public readonly exp: number,
    public readonly aud: string,
    public readonly iss: string,
  ) {}
}
