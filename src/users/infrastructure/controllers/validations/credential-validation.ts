import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { isEmpty } from 'lodash';
import { Password } from 'src/common/domain/entities/credential';

@ValidatorConstraint({ async: false })
export class CredentialValidation implements ValidatorConstraintInterface {
  private errors: string[] = [];

  validate(value: string): boolean | Promise<boolean> {
    const errors = Password.validateStatic(value);
    this.errors = errors;
    return isEmpty(errors);
  }

  defaultMessage?(): string {
    return this.errors.toString();
  }
}
