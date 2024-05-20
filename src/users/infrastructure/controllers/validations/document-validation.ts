import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Document } from 'src/common/entities/document';

@ValidatorConstraint({ async: false })
export class DocumentValidation implements ValidatorConstraintInterface {
  validate(value: string): boolean | Promise<boolean> {
    return Document.validateStatic(value);
  }
  defaultMessage?(): string {
    // here you can provide default error message if validation failed
    return 'Invalid ($value) document number';
  }
}
