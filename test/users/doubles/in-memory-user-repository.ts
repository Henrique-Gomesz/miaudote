import { indexOf, isEqual, isNil } from 'lodash';
import { User } from 'src/users/domain/entities/user';
import { UpdateUser } from 'src/users/domain/entities/user-update';
import { SaveUserListeners, UserRepository } from 'src/users/domain/repositories/user-repository';

export class InMemoryUserRepository implements UserRepository {
  public users: User[];

  public withError: boolean;

  public constructor(users: User[] = []) {
    this.users = users;
    this.withError = false;
  }

  async saveUser(user: User, listeners: SaveUserListeners): Promise<void> {
    if (this.withError) return listeners.onError();

    this.users.push(user);
    return listeners.onSuccess();
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((user) => isEqual(email, user.email));

    if (isNil(user)) return undefined;

    return user;
  }

  async updateUserById(updateUser: UpdateUser, id: string): Promise<User | undefined> {
    let user = this.users[parseInt(id)];

    if (isNil(user)) return undefined;

    user.about = updateUser.about;
    if (updateUser.birthday) user.birthday = new Date(updateUser.birthday);
    user.image = updateUser.image;
    if (updateUser.name) user.name = updateUser.name;

    this.users = this.users.map((u) => (u.id === id ? user : u));

    return user;
  }

  public setError(): void {
    this.withError = true;
  }
}
