import { Get, Res, Inject, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { NavigationControl } from 'app/common/navigation/navigation-control';
import { TemplateConstantProviderService } from 'app/common/services/template-constant-provider/template-constant-provider.service';
import { Session } from 'ch-node-session-handler';
import { ConfigService } from '@nestjs/config';

export type BasicControllerData = {
  template: string;
  navigation: NavigationControl;
};

export class BaseController<T = any> implements BasicControllerData {
  @Inject()
  public readonly templateConstantsProvider: TemplateConstantProviderService;

  @Inject()
  public readonly configService: ConfigService;

  constructor(public readonly template: string, public readonly navigation: NavigationControl) {}

  @Get()
  protected onGet(@Req() request: Request, @Res() response: Response): void {
    return response.render(this.template, {
      ...this.navigation,
      ...(this.onGetModelData(request) as any),
      ...this.templateConstantsProvider.getServiceConstants(),
    });
  }

  public onGetModelData(req: Request): T | {} {
    const session: Session | undefined = req.session;
    return (this.onGetModelDataFromSession(session) as T) || {};
  }

  public onGetModelDataFromSession(session: Session | undefined): T | {} {
    return {} as T;
  }

  protected addToSession<A>(dataKey: string, req: Request, map: Partial<A>): void {
    const session: Session | undefined = req.session;

    if (!session) {
      return;
    }

    const data = session.getExtraData<A>(dataKey) || ({} as A);

    if (!data) {
      return;
    }

    for (const key in map) {
      if (map.hasOwnProperty(key)) {
        data[key] = map[key] as any;
      }
    }
    req.session?.setExtraData<A>(dataKey, data);
  }
}
