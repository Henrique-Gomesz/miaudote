import { Injectable } from '@nestjs/common';

import { isNil, noop } from 'lodash';
import { PasswordService } from 'src/common/domain/services/credential-service';
import { StateRepository } from 'src/states/domain/repositories/states-repository';
import { Address } from '../entities/address';
import { User } from '../entities/user';
import { UserRepository } from '../repositories/user-repository';

@Injectable()
export class CreateUserCommand {
  public onSuccess: () => void = noop;

  public onError: () => void = noop;

  public onAddressError: () => void = noop;

  public constructor(
    private readonly userRepository: UserRepository,
    private readonly stateRepository: StateRepository,
    private readonly passwordService: PasswordService,
  ) {}

  public async execute(user: User): Promise<void> {
    const isAddressValid = await this.validateUserAddress(user.getMainAddress());

    if (!isAddressValid) return this.onAddressError();

    user.password = await this.passwordService.hashPassword(user.password);

    return await this.userRepository.saveUser(user, {
      onError: this.onError,
      onSuccess: this.onSuccess,
    });
  }

  private async validateUserAddress(address?: Address): Promise<boolean> {
    if (isNil(address)) return false;

    const userState = await this.stateRepository.getStateByName(address.state);

    if (isNil(userState)) return false;

    const userCity = userState.getCityByName(address.city);

    if (isNil(userCity)) return false;

    return true;
  }
}
