import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Document } from 'src/common/entities/document';

@ValidatorConstraint({ async: false })
export class DocumentValidation implements ValidatorConstraintInterface {
  validate(
    value: string,
    _validationArguments?: ValidationArguments | undefined,
  ): boolean | Promise<boolean> {
    return Document.validateStatic(value);
  }
  defaultMessage?(
    _validationArguments?: ValidationArguments | undefined,
  ): string {
    // here you can provide default error message if validation failed
    return 'Invalid ($value) document number';
  }
}
