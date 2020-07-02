import { UnprocessableEntityException, Type  } from '@nestjs/common';
import { VALIDATION_ERROR_METADATA_KEY } from 'src/common/decorators/validation-errors.decorator';
import { ValidationError } from 'src/common/validation/validation-error.model';
import { ValidationResult, ValidationSuccess, ValidationFailed } from '../validation/validation-result.model';

export class TypedUnprocessableEntityException<T> extends UnprocessableEntityException {
    constructor(public readonly type: Type<T>, public readonly model: T) {
        super(`Validation error occurred: ${JSON.stringify(Reflect.getMetadata(VALIDATION_ERROR_METADATA_KEY, model))}`)
    }

    public getValidationErrors(): ValidationResult<T> {
        const errors: ValidationError<T>[] = Reflect.getMetadata(VALIDATION_ERROR_METADATA_KEY, this.type);
        if (errors.length == 0) {
            return new ValidationSuccess();
        } else {
            return new ValidationFailed(errors);
        }
    }
}
