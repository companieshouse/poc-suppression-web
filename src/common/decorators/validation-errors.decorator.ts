import { SetMetadata, CustomDecorator } from '@nestjs/common';
import { ValidationError } from 'app/common/validation/validation-error.model';

export const VALIDATION_ERROR_METADATA_KEY = 'validation-error:metadata';

export function ValidationErrors<T>(errors: ValidationError<T>[]): CustomDecorator {
  return SetMetadata(VALIDATION_ERROR_METADATA_KEY, errors);
}
