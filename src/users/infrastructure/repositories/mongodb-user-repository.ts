import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/domain/entities/user';
import {
  SaveUserListeners,
  UserRepository,
} from 'src/users/domain/repositories/user-repository';
import { User as UserModel } from '../schemas/user.schema';

@Injectable()
export class MongodbUserRepository extends UserRepository {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserModel>,
  ) {
    super();
  }
  async saveUser(user: User, listeners: SaveUserListeners): Promise<void> {
    try {
      const createdCat = new this.userModel(user);
      await createdCat.save();
      return listeners.onSuccess();
    } catch (error) {
      return listeners.onError();
    }
  }
}
