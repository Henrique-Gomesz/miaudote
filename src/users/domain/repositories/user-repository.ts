import { Address } from '../entities/address';
import { UpdateAddress } from '../entities/address-update';
import { User } from '../entities/user';
import { UpdateUser } from '../entities/user-update';

export interface SaveUserListeners {
  onSuccess: () => void;
  onError: () => void;
}

export abstract class UserRepository {
  abstract saveUser(user: User, listeners: SaveUserListeners): Promise<void>;

  abstract getUserByEmail(email: string): Promise<User | undefined>;

  abstract updateUserById(user: UpdateUser, id: string): Promise<User | undefined>;

  abstract updateAddressById(address: UpdateAddress, id: string): Promise<Address | undefined>;
}
