import { Global, Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { State, StateSchema } from './infrastructure/schemas/state-schema';
import { ListStatesController } from './infrastructure/controllers/list-states-controller';
import { ListStatesCommand } from './domain/commands/list-states-command';
import { StateRepository } from './domain/repositories/states-repository';
import { MongodbStateRepository } from './infrastructure/repositories/mongodb-state-repository';

const StateRepositoryProvider: Provider = {
  provide: StateRepository,
  useClass: MongodbStateRepository,
};

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: State.name, schema: StateSchema }]),
  ],
  controllers: [ListStatesController],
  providers: [ListStatesCommand, StateRepositoryProvider],
  exports: [StateRepositoryProvider],
})
export class StatesModule {}
