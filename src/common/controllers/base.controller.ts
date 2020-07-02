import { Get, Res, Inject } from '@nestjs/common';
import { Response } from 'express';
import { NavigationControl } from 'app/common/navigation/navigation-control';
import { TemplateConstantProviderService } from 'app/common/services/template-constant-provider/template-constant-provider.service';

export type BasicControllerData = {
  template: string;
  navigation: NavigationControl;
};

export class BaseController<T = any> implements BasicControllerData {
  @Inject()
  public readonly templateConstantsProvider: TemplateConstantProviderService;

  constructor(public readonly template: string, public readonly navigation: NavigationControl) {}

  @Get()
  protected onGet(@Res() response: Response): void {
    return response.render(this.template, {
      ...this.navigation,
      ...(this.onGetModelData() as any),
      ...this.templateConstantsProvider.getServiceConstants(),
    });
  }

  public onGetModelData(): T {
    return {} as T;
  }
}
