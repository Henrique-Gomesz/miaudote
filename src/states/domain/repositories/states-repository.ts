import { Injectable } from '@nestjs/common';
import { State } from '../entities/state';

@Injectable()
export abstract class StateRepository {
  public abstract listAll(): Promise<State[]>;
}
