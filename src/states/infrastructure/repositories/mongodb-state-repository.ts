import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { none, Option, some } from 'fp-ts/lib/Option';
import { Model } from 'mongoose';
import { State } from 'src/states/domain/entities/state';
import { StateRepository } from 'src/states/domain/repositories/states-repository';
import {
  StateDocument,
  State as StateModel,
} from 'src/states/infrastructure/schemas/state-schema';

@Injectable()
export class MongodbStateRepository extends StateRepository {
  public constructor(
    @InjectModel(StateModel.name) private stateModel: Model<StateModel>,
  ) {
    super();
  }

  public async getStateByName(name: string): Promise<Option<State>> {
    const state = await this.stateModel.findOne({ name: name });

    if (state) return some(this.toDomain(state));

    return none;
  }

  public async listAll(): Promise<State[]> {
    const states = await this.stateModel.find();

    return states.map(this.toDomain);
  }

  public toDomain(state: StateDocument): State {
    return new State(state.name, state.acronym, state.cities);
  }
}
