import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class AuthService {
  public abstract generateToken(payload: Record<string, unknown>): Promise<string>;

  public abstract validateToken(token: string): Promise<boolean>;
}
