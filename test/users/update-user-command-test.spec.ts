import { isNil } from 'lodash';
import { UpdateUserCommand } from 'src/users/domain/commands/update-user-command';
import { UpdateUser } from 'src/users/domain/entities/user-update';
import { readUpdateCSVFile } from 'test/utils/csv-reader';
import { users } from 'test/utils/mock-users';
import { InMemoryUserRepository } from './doubles/in-memory-user-repository';

describe('UpdateUserCommand', () => {
  let user: UpdateUser;
  let id: string;

  beforeAll(async () => {
    const row = await readUpdateCSVFile('update-users.csv');

    const csvUser = row.pop();

    if (isNil(csvUser)) {
      throw new Error('User is not defined on the csv');
    }

    user = new UpdateUser(csvUser.name, csvUser.birthday, csvUser.about, csvUser.image);
    id = csvUser.id;
  });

  it('should update user in user repository and call the on success listener on update user', async () => {
    const userRepository = new InMemoryUserRepository(users);

    const updateUserCommand = new UpdateUserCommand(userRepository);
    updateUserCommand.onSuccess = jest.fn();
    updateUserCommand.onError = jest.fn();

    await updateUserCommand.execute(user, id);

    expect(updateUserCommand.onSuccess).toHaveBeenCalled();
  });

  it('should return error in update user in user repository and call the on error listener on update user', async () => {
    const userRepository = new InMemoryUserRepository(users);

    const updateUserCommand = new UpdateUserCommand(userRepository);
    updateUserCommand.onError = jest.fn();

    await updateUserCommand.execute(user, '9');

    expect(updateUserCommand.onError).toHaveBeenCalled();
  });
});
