import { UnprocessableEntityException } from '@nestjs/common';
import { ValidationResult } from 'app/common/validation/validation.types';
import { ValidationError } from 'class-validator';
import { TemplateValidationError } from 'app/common/validation/validation-error.model';

export class TypedUnprocessableEntityException<T> extends UnprocessableEntityException {
  constructor(public readonly validationErrors: ValidationError[]) {
    super(`Validation error occurred: ${JSON.stringify(validationErrors)}`);
  }

  public getValidationErrors(): ValidationResult<T> {
    return this.validationErrors.reduceRight((p, c) => {
      p[c.property] = new TemplateValidationError(Object.values(c.constraints || {}).join(', '));
      return p;
    }, {} as ValidationResult<T>);
  }
}
