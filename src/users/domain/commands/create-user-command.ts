import { Injectable } from '@nestjs/common';
import { isNone, Option } from 'fp-ts/Option';
import { noop } from 'lodash';
import { StateRepository } from 'src/states/domain/repositories/states-repository';
import { Address } from '../entities/address';
import { User } from '../entities/user';
import { UserRepository } from '../repositories/user-repository';
import { cons } from 'fp-ts/lib/ReadonlyNonEmptyArray';

@Injectable()
export class CreateUserCommand {
  public onSuccess: () => void = noop;

  public onError: () => void = noop;

  public onAddressError: () => void = noop;

  public constructor(
    private readonly userRepository: UserRepository,
    private readonly stateRepository: StateRepository,
  ) {}

  public async execute(user: User): Promise<void> {
    const isAddressValid = await this.validateUserAddress(
      user.getMainAddress(),
    );

    if (!isAddressValid) return this.onAddressError();

    return await this.userRepository.saveUser(user, {
      onError: this.onError,
      onSuccess: this.onSuccess,
    });
  }

  private async validateUserAddress(
    address: Option<Address>,
  ): Promise<boolean> {
    if (isNone(address)) return false;

    const userState = await this.stateRepository.getStateByName(
      address.value.city,
    );
    //fix state error
    if (isNone(userState)) return false;

    console.log(userState.value);
    const userCity = userState.value.getCityByName(address.value.city);

    if (isNone(userCity)) return false;

    return true;
  }
}
