import { isEqual, isNil } from 'lodash';
import { State } from 'src/states/domain/entities/state';
import { StateRepository } from 'src/states/domain/repositories/states-repository';

export class InMemoryStateRepository implements StateRepository {
  public states: State[];

  public constructor(states: State[] = []) {
    this.states = states;
  }

  public async listAll(): Promise<State[]> {
    return this.states;
  }

  public async getStateByName(name: string): Promise<State | undefined> {
    const state = this.states.find((s) => isEqual(name, s.name));

    if (isNil(state)) return undefined;

    return state;
  }
}
