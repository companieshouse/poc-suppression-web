import { ArgumentsHost, Catch, ExceptionFilter, Type, HttpException } from '@nestjs/common';
import { TypedUnprocessableEntityException } from 'src/common/exceptions/typed-unprocessable-entity.exception';
import { Response } from 'express';
import { BasicControllerData } from '../controllers/base.controller';

@Catch(TypedUnprocessableEntityException)
export class JoiValidationExceptionFilter<T> implements ExceptionFilter<TypedUnprocessableEntityException<T>> {
  constructor(private readonly type: Type<T>, private readonly controller: BasicControllerData) { }

  public catch(exception: TypedUnprocessableEntityException<T>, host: ArgumentsHost) {
    switch (exception.type) {
      case this.type: {
        return host
          .switchToHttp()
          .getResponse<Response>()
          .render(this.controller.template, {
            ...exception.getValidationErrors(),
            ...this.controller.navigation,
            ...exception.model
          });
      }
      default: {
        host.switchToHttp().getResponse<Response>().send();
      }
    }
  }
}
