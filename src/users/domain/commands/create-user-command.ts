import { Injectable } from '@nestjs/common';
import { noop } from 'lodash';
import { UserRepository } from '../repositories/user-repository';
import { User } from '../entities/user';

@Injectable()
export class CreateUserCommand {
  public onSuccess: () => void = noop;

  public onError: () => void = noop;

  public constructor(private readonly userRepository: UserRepository) {}

  public async execute(user: User): Promise<void> {
    return await this.userRepository.saveUser(user, {
      onError: this.onError,
      onSuccess: this.onSuccess,
    });
  }
}
