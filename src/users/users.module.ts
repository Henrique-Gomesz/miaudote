import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateUserController } from './infrastructure/controllers/user.controller';

import {
  Address,
  AddressSchema,
} from './infrastructure/schemas/address.schema';

import { State, StateSchema } from './infrastructure/schemas/state.schema';
import { User, UserSchema } from './infrastructure/schemas/user.schema';
import { CreateUserCommand } from './domain/commands/create-user-command';
import { UserRepository } from './domain/repositories/user-repository';
import { MongodbUserRepository } from './infrastructure/repositories/mongodb-user-repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Address.name, schema: AddressSchema },
      { name: State.name, schema: StateSchema },
    ]),
  ],
  controllers: [CreateUserController],
  providers: [
    CreateUserCommand,
    { provide: UserRepository, useClass: MongodbUserRepository },
  ],
})
export class UsersModule {}
