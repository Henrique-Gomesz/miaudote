import { Injectable } from '@nestjs/common';
import { State } from '../entities/state';

@Injectable()
export abstract class StateRepository {
  public abstract listAll(): Promise<State[]>;

  public abstract getStateByName(name: string): Promise<State | undefined>;
}
