import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from 'src/auth/domain/entities/AuthenticatedUser';

import { AuthService } from 'src/auth/domain/service/auth-service';

@Injectable()
export class JwtAuthService extends AuthService {
  public constructor(private readonly jwtService: JwtService) {
    super();
  }

  public async decodeToken(token: string): Promise<UserPayload> {
    const decodedToken = this.jwtService.decode(token) as UserPayload;

    return new UserPayload(
      decodedToken.id,
      decodedToken.iat,
      decodedToken.exp,
      decodedToken.aud,
      decodedToken.iss,
    );
  }

  public async generateToken(payload: Record<string, unknown>): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }

  public async validateToken(token: string): Promise<boolean> {
    try {
      await this.jwtService.verifyAsync(token);

      return true;
    } catch (error) {
      Logger.log(error);
      return false;
    }
  }
}
