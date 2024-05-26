import { PasswordService } from 'src/common/domain/services/credential-service';
import * as bcrypt from 'bcrypt';

export class BcryptPasswordService extends PasswordService {
  public async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }
  public async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    const passwordMatch = await bcrypt.compare(plainPassword, hashedPassword);

    return passwordMatch;
  }
}
