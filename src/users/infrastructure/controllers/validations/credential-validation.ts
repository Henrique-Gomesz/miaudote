import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isEmpty } from 'lodash';
import { Credential } from 'src/common/credential';

@ValidatorConstraint({ async: false })
export class CredentialValidation implements ValidatorConstraintInterface {
  private errors: string[] = [];

  validate(value: string): boolean | Promise<boolean> {
    const errors = Credential.validateStatic(value);
    this.errors = errors;
    return isEmpty(errors);
  }

  defaultMessage?(): string {
    return this.errors.toString();
  }
}
