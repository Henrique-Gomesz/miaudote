import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './infrastructure/controllers/user.controller';
import { UsersService } from './infrastructure/controllers/user.service';
import {
  Address,
  AddressSchema,
} from './infrastructure/schemas/address.schema';
import { City, CitySchema } from './infrastructure/schemas/city.schema';
import { State, StateSchema } from './infrastructure/schemas/state.schema';
import { User, UserSchema } from './infrastructure/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Address.name, schema: AddressSchema },
      { name: City.name, schema: CitySchema },
      { name: State.name, schema: StateSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
