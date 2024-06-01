import { Injectable } from '@nestjs/common';
import { UserPayload } from '../entities/AuthenticatedUser';

@Injectable()
export abstract class AuthService {
  public abstract generateToken(payload: Record<string, unknown>): Promise<string>;

  public abstract validateToken(token: string): Promise<boolean>;

  public abstract decodeToken(token: string): Promise<UserPayload>;
}
