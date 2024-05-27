import { Injectable } from '@nestjs/common';
import { noop } from 'lodash';
import { AuthService } from '../service/auth-service';
import { PasswordService } from 'src/common/domain/services/credential-service';
import { Credential } from 'src/auth/domain/entities/credential';
import { UserRepository } from 'src/users/domain/repositories/user-repository';
import { getOrElse, isNone } from 'fp-ts/lib/Option';

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

    if (isNone(user)) return this.onError();

    if (!(await this.passwordService.comparePasswords(credential.password, user.value.password)))
      return this.onError();

    const token = await this.authService.generateToken({
      id: getOrElse(() => '')(user.value.id),
    });

    return this.onSuccess(token);
  }
}
