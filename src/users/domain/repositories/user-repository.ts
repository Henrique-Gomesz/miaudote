import { Option } from 'fp-ts/lib/Option';
import { User } from '../entities/user';

export interface SaveUserListeners {
  onSuccess: () => void;
  onError: () => void;
}

export abstract class UserRepository {
  abstract saveUser(user: User, listeners: SaveUserListeners): Promise<void>;

  abstract getUserByEmail(email: string): Promise<Option<User>>;
}
