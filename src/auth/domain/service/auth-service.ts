import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class AuthService {
  public abstract authenticateUser(credential: Credential): Promise<string>;
}
