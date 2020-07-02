import { ValidationError } from './validation-error.model';

type ValidationResultInterface<T> = {
  validationErrors: ValidationError<T>[];
  getErrorForField: (field: keyof T) => ValidationError<T> | undefined;
};

export class ValidationFailed<T> implements ValidationResultInterface<T> {
  constructor(public readonly validationErrors: ValidationError<T>[]) {}
  getErrorForField = (field: keyof T) => this.validationErrors.find(error => error.field === String(field));
}

export class ValidationSuccess implements ValidationResultInterface<any> {
  public readonly validationErrors: ValidationError<any>[] = [];
  getErrorForField = () => undefined;
}

export type ValidationResult<T> = ValidationFailed<T> | ValidationSuccess;
