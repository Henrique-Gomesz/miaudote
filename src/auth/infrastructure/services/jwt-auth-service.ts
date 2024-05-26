import { AuthService } from 'src/auth/domain/service/auth-service';

export class JwtAuthService extends AuthService {
  public constructor() {
    super();
  }

  public authenticateUser(credential: Credential): Promise<string> {
    throw new Error(`${credential}`);
  }
}
