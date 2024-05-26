import { IsEmail, Validate } from 'class-validator';
import { CredentialValidation } from 'src/users/infrastructure/controllers/validations/credential-validation';

export class LoginDto {
  @IsEmail()
  email: string;

  @Validate(CredentialValidation)
  password: string;
}
