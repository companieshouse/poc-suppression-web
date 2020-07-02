import { ArgumentMetadata, PipeTransform, Type, Injectable } from '@nestjs/common';
import Joi, { ObjectSchema } from '@hapi/joi';
import { TypedUnprocessableEntityException } from '../exceptions/typed-unprocessable-entity.exception';
import { SCHEMA_METADATA_KEY } from '../decorators/schema.decorator';

@Injectable()
export class JoiValidationPipe<T> implements PipeTransform<T, T> {

  constructor(private t: Type<T>) { }

  public transform(value: T, metadata: ArgumentMetadata): T {

    let instance: T = new this.t();
    Object.assign(instance, value);

    const schema: ObjectSchema<T> = Reflect.getMetadata(SCHEMA_METADATA_KEY, this.t);

    const validationResult: Joi.ValidationResult = schema.validate(value, {
      abortEarly: false,
      convert: false
    });

    if (validationResult.error) {
      throw new TypedUnprocessableEntityException<T>(this.t, instance, validationResult);
    }
    return instance;
  }
}

