import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { TypedUnprocessableEntityException } from 'app/common/exceptions/typed-unprocessable-entity.exception';
import { Response, Request } from 'express';
import { BasicControllerData } from 'app/common/controllers/base.controller';

@Catch(TypedUnprocessableEntityException)
export class ModelValidationExceptionFilter implements ExceptionFilter<TypedUnprocessableEntityException<any>> {
  constructor(private readonly controller: BasicControllerData) {}

  public catch(exception: TypedUnprocessableEntityException<any>, host: ArgumentsHost): void {
    const httpHost = host.switchToHttp();

    return httpHost.getResponse<Response>().render(this.controller.template, {
      validationErrors: exception.getValidationErrors(),
      ...this.controller.navigation,
      ...httpHost.getRequest<Request>().body,
    });
  }
}
