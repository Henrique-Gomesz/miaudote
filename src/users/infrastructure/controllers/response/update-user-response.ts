import { User } from 'src/users/domain/entities/user';

export class UpdateUserResponse {
  static toResponse(user: User): unknown {
    return {
      name: user.name,
      document: user.document.toString(),
      email: user.email,
      phone: user.phone,
      birthday: user.birthday,
      about: user.about,
      image: user.image,
    };
  }
}
