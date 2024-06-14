import { isNil } from 'lodash';
import { Document } from 'src/common/domain/entities/document';
import { BcryptPasswordService } from 'src/common/infrastructure/services/bcrypt-password-service';
import { State } from 'src/states/domain/entities/state';
import { CreateUserCommand } from 'src/users/domain/commands/create-user-command';
import { Address } from 'src/users/domain/entities/address';
import { User } from 'src/users/domain/entities/user';
import { InMemoryStateRepository } from 'test/address/doubles/in-memory-state-repository';
import { readCreateCSVFile } from 'test/utils/csv-reader';
import { InMemoryUserRepository } from './doubles/in-memory-user-repository';

describe('CreateUserCommand', () => {
  let user: User;

  beforeAll(async () => {
    const row = await readCreateCSVFile('users.csv');

    const csvUser = row.pop();

    if (isNil(csvUser)) {
      throw new Error('User is not defined on the csv');
    }

    const address = new Address(
      csvUser.city,
      csvUser.state,
      csvUser.street,
      csvUser.number,
      csvUser.zipCode,
      csvUser.complement,
      csvUser.neighborhood,
      true,
    );

    user = new User(
      csvUser.name,
      new Document(csvUser.document),
      csvUser.password,
      csvUser.email,
      csvUser.phone,
      new Date(csvUser.birthday),
      [address],
      csvUser.about,
      csvUser.image,
    );
  });

  it('should save user in user repository and call the on success listener on create user', async () => {
    const userRepository = new InMemoryUserRepository();
    const stateRepository = new InMemoryStateRepository([
      new State('Rio de Janeiro', 'RJ', ['Rio de Janeiro']),
    ]);

    const createUserCommand = new CreateUserCommand(
      userRepository,
      stateRepository,
      new BcryptPasswordService(),
    );
    createUserCommand.onSuccess = jest.fn();
    createUserCommand.onError = jest.fn();
    createUserCommand.onAddressError = jest.fn();

    await createUserCommand.execute(user);

    expect(createUserCommand.onSuccess).toHaveBeenCalled();
  });

  it('should call onAddressError when there is something wrong with the address', async () => {
    const userRepository = new InMemoryUserRepository();
    const stateRepository = new InMemoryStateRepository([
      new State('Rio de Janeiro', 'SP', ['São Pauloo']),
    ]);

    const createUserCommand = new CreateUserCommand(
      userRepository,
      stateRepository,
      new BcryptPasswordService(),
    );
    createUserCommand.onSuccess = jest.fn();
    createUserCommand.onError = jest.fn();
    createUserCommand.onAddressError = jest.fn();

    await createUserCommand.execute(user);

    expect(createUserCommand.onAddressError).toHaveBeenCalled();
  });

  it('should call onError when something went wrong while trying to save user', async () => {
    const userRepository = new InMemoryUserRepository();
    userRepository.setError();

    const stateRepository = new InMemoryStateRepository([
      new State('Rio de Janeiro', 'RJ', ['Rio de Janeiro']),
    ]);

    const createUserCommand = new CreateUserCommand(
      userRepository,
      stateRepository,
      new BcryptPasswordService(),
    );
    createUserCommand.onSuccess = jest.fn();
    createUserCommand.onError = jest.fn();
    createUserCommand.onAddressError = jest.fn();

    await createUserCommand.execute(user);

    expect(createUserCommand.onError).toHaveBeenCalled();
  });
});
