import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { TypedUnprocessableEntityException } from 'src/common/exceptions/typed-unprocessable-entity.exception';
import { Response } from 'express';
import { BasicControllerData } from '../controllers/base.controller';

@Catch(TypedUnprocessableEntityException)
export class JoiValidationExceptionFilter implements ExceptionFilter<TypedUnprocessableEntityException<any>> {
  constructor(private readonly controller: BasicControllerData) { }

  public catch(exception: TypedUnprocessableEntityException<any>, host: ArgumentsHost) {
    return host
      .switchToHttp()
      .getResponse<Response>()
      .render(this.controller.template, {
        ...exception.getValidationErrors(),
        ...this.controller.navigation,
        ...exception.model
      });
  }
}
