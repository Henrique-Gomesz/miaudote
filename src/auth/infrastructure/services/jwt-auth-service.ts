import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/domain/service/auth-service';

@Injectable()
export class JwtAuthService extends AuthService {
  public constructor(private readonly jwtService: JwtService) {
    super();
  }

  public async generateToken(payload: Record<string, unknown>): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }

  public async validateToken(token: string): Promise<boolean> {
    try {
      await this.jwtService.verifyAsync(token);
      return true;
    } catch (error) {
      Logger.log(error)
      return false
    }
  
  }
}
