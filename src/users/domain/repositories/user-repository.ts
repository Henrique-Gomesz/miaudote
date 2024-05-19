import { User } from '../entities/user';

export interface SaveUserListeners {
  onSuccess: () => void;
  onError: () => void;
}

export abstract class UserRepository {
  abstract saveUser(user: User, listeners: SaveUserListeners): Promise<void>;
}
