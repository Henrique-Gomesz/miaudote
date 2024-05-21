import { Injectable } from '@nestjs/common';
import { Option } from 'fp-ts/Option';
import { State } from '../entities/state';

@Injectable()
export abstract class StateRepository {
  public abstract listAll(): Promise<State[]>;

  public abstract getStateByName(name: string): Promise<Option<State>>;
}
