import { Get, Res, Inject, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { NavigationControl } from 'app/common/navigation/navigation-control';
import { TemplateConstantProviderService } from 'app/common/services/template-constant-provider/template-constant-provider.service';
import { SuppressionsJourney } from 'app/suppressions/model/suppressions.model';
import { APP_SESSION_DATA_KEY } from 'app/app.module';
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

  public onGetModelDataFromSession(session: Session): T | {} {
    if (!session) {
      return;
    }
    return {} as T;
  }

  protected addToSession(req: Request, map: Partial<SuppressionsJourney>): void {
    const session: Session | undefined = req.session;

    if (!session) {
      return;
    }

    const suppressionsJourney = session.getExtraData<SuppressionsJourney>(APP_SESSION_DATA_KEY) || {};

    for (const key in map) {
      if (map.hasOwnProperty(key)) {
        suppressionsJourney[key] = map[key];
      }
    }
    req.session?.setExtraData<SuppressionsJourney>(APP_SESSION_DATA_KEY, suppressionsJourney as SuppressionsJourney);
  }
}
