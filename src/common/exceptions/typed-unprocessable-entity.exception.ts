import { UnprocessableEntityException, Type } from '@nestjs/common';
import { VALIDATION_ERROR_METADATA_KEY } from 'src/common/decorators/validation-errors.decorator';
import { ValidationError } from 'src/common/validation/validation-error.model';
import { ValidationFailed } from '../validation/validation-result.model';
import Joi from '@hapi/joi';

export class TypedUnprocessableEntityException<T> extends UnprocessableEntityException {
    constructor(public readonly type: Type<T>, public readonly model: T, public readonly error: Joi.ValidationResult) {
        super(`Validation error occurred: ${JSON.stringify(Reflect.getMetadata(VALIDATION_ERROR_METADATA_KEY, model))}`);

    }

    public getValidationErrors(): ValidationFailed<T> {

        let errors: ValidationError<T>[] = Reflect.getMetadata(VALIDATION_ERROR_METADATA_KEY, this.type);

        const paths: string[] = this.getPaths(this.error.error);

        let newErrors: ValidationError<T>[] = [];

        for (const path of paths) {
            const error = errors.find(err => err.field.toString() === path);
            if (error) {
                newErrors.push(error);
            }
        }
        return new ValidationFailed(newErrors);

    }

    private getPaths(error: Joi.ValidationError): string[] {
        const paths: string[] = error.details.map(_ => _.path.toString());
        const newPaths: string[] = [];

        for (const path of paths) {
            if (!newPaths.includes(path)) {
                newPaths.push(path);
            }
        }
        return newPaths;

    }

}
