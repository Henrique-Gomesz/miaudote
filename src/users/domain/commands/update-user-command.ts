import { Injectable, Logger } from '@nestjs/common';
import { isNil, noop } from 'lodash';
import { User } from '../entities/user';
import { UpdateUser } from '../entities/user-update';
import { UserRepository } from '../repositories/user-repository';

@Injectable()
export class UpdateUserCommand {
  public onSuccess: (user: User) => void = noop;
  public onError: () => void = noop;

  public constructor(private readonly userRepository: UserRepository) {}

  public async execute(userInfo: UpdateUser, id: string): Promise<void> {
    try {
      const updatedUser = await this.userRepository.updateUserById(userInfo, id);

      if (isNil(updatedUser)) {
        return this.onError();
      }

      this.onSuccess(updatedUser);
    } catch (e) {
      console.log('Erro: ', e);
      Logger.log('[UpdateUserCommand] - Error in updateUserById, error: ', e);
      return this.onError();
    }
  }
}
