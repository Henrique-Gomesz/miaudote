export abstract class PasswordService {
  public abstract hashPassword(password: string): Promise<string>;

  public abstract comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean>;
}
