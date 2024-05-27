import { IsEmail, Validate } from 'class-validator';
import { Credential } from 'src/auth/domain/entities/credential';
import { CredentialValidation } from 'src/users/infrastructure/controllers/validations/credential-validation';

export class LoginDto {
  @IsEmail()
  email: string;

  @Validate(CredentialValidation)
  password: string;

  public static toDomain(loginDto: LoginDto): Credential {
    const credential = new Credential(loginDto.email, loginDto.password);

    return credential;
  }
}
