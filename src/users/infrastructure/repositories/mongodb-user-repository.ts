import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { fromNullable, none, Option, some } from 'fp-ts/lib/Option';
import { Model } from 'mongoose';
import { Document } from 'src/common/domain/entities/document';
import { User } from 'src/users/domain/entities/user';
import { SaveUserListeners, UserRepository } from 'src/users/domain/repositories/user-repository';
import { UserDocument, User as UserModel } from '../schemas/user.schema';

@Injectable()
export class MongodbUserRepository extends UserRepository {
  constructor(@InjectModel(UserModel.name) private userModel: Model<UserModel>) {
    super();
  }

  async saveUser(user: User, listeners: SaveUserListeners): Promise<void> {
    try {
      const createUser = new this.userModel(user);
      await createUser.save();
      return listeners.onSuccess();
    } catch (error) {
      Logger.log(JSON.stringify(error));
      return listeners.onError();
    }
  }

  async getUserByEmail(email: string): Promise<Option<User>> {
    const user = await this.userModel.findOne({ email: email });

    return user ? some(this.toDomain(user)) : none;
  }

  private toDomain(user: UserDocument): User {
    return new User(
      user.name,
      new Document(user.document),
      user.password,
      user.email,
      user.phone,
      user.birthday,
      user.addresses,
      fromNullable(user.about),
      fromNullable(user.image),
      fromNullable(user.id),
    );
  }
}
