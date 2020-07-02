import { SetMetadata } from '@nestjs/common';
import { ValidationError } from 'src/common/validation/validation-error.model';

export const VALIDATION_ERROR_METADATA_KEY = 'validation-error:metadata';

export function ValidationErrors<T>(errors: ValidationError<T>[]) {
    return SetMetadata(VALIDATION_ERROR_METADATA_KEY, errors);
}