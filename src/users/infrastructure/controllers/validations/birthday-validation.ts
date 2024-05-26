import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { DateTime, Interval } from 'luxon';

const MINIMUM_AGE = 18;

@ValidatorConstraint({ async: false })
export class BirthdayValidation implements ValidatorConstraintInterface {
  validate(value: string): boolean | Promise<boolean> {
    const currentDate = DateTime.now();
    const birthdayDate = DateTime.fromISO(value);
    const interval = Interval.fromDateTimes(birthdayDate, currentDate);

    return interval.length('years') >= MINIMUM_AGE;
  }

  defaultMessage?(): string {
    return 'The age must be greater than 18';
  }
}
