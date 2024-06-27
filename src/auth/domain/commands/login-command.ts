import { Injectable } from '@nestjs/common';
import { isNil, noop } from 'lodash';
import { Credential } from 'src/auth/domain/entities/credential';
import { PasswordService } from 'src/common/domain/services/credential-service';
import { UserRepository } from 'src/users/domain/repositories/user-repository';
import { AuthService } from '../service/auth-service';

@Injectable()
export class LoginCommand {
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
    private readonly passwordService: PasswordService,
  ) {}

  public onSuccess: (token: string) => void = noop;
  public onError: () => void = noop;

  public async execute(credential: Credential): Promise<void> {
    const user = await this.userRepository.getUserByEmail(credential.email);

    if (isNil(user)) return this.onError();

    if (!(await this.passwordService.comparePasswords(credential.password, user.password)))
      return this.onError();

    const token = await this.authService.generateToken({
      id: user.id,
    });

    return this.onSuccess(token);
  }
}
