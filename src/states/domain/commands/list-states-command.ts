import { Injectable } from '@nestjs/common';
import { noop } from 'lodash';
import { StateRepository } from '../repositories/states-repository';
import { State } from '../entities/state';

@Injectable()
export class ListStatesCommand {
  public constructor(private readonly stateRepository: StateRepository) {}

  public onSuccess: (states: State[]) => void = noop;
  public onError: () => void = noop;

  public async execute() {
    try {
      const states = await this.stateRepository.listAll();
      return this.onSuccess(states);
    } catch (error) {
      return this.onError();
    }
  }
}
