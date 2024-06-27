import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isNil, unset } from 'lodash';
import { Model } from 'mongoose';
import { Document } from 'src/common/domain/entities/document';
import { User } from 'src/users/domain/entities/user';
import { UpdateUser } from 'src/users/domain/entities/user-update';
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
      Logger.log(
        'Erro ao executar o método saveUser de [MongodbUserRepository]: ' +
          JSON.stringify(error, null, 2),
      );
      return listeners.onError();
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ email: email });

    return isNil(user) ? undefined : this.toDomain(user);
  }

  async updateUserById(userInfo: UpdateUser, id: string): Promise<User | undefined> {
    const update = {
      name: isNil(userInfo.name) ? undefined : userInfo.name,
      image: isNil(userInfo.image) ? undefined : userInfo.image,
      birthday: isNil(userInfo.birthday) ? undefined : new Date(userInfo.birthday),
      about: isNil(userInfo.about) ? undefined : userInfo.about,
    };

    Object.entries(update).forEach(([key, value]) => {
      if (isNil(value)) {
        unset(update, key);
      }
    });

    const user = await this.userModel.findByIdAndUpdate(id, update, { new: true });

    return isNil(user) ? undefined : this.toDomain(user);
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
      user.about,
      user.image,
      user.id,
    );
  }
}
