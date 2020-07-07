import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { SessionMiddleware as CHSessionMiddleware, CookieConfig, SessionStore, Session } from 'ch-node-session-handler';
import { RequestHandler } from '@nestjs/common/interfaces';
import IORedis from 'ioredis';
import { Cookie } from 'ch-node-session-handler/lib/session/model/Cookie';

@Injectable()
export class SessionMiddleware implements NestMiddleware<Request, Response> {
  private sessionHandler: RequestHandler<Request, Response>;
  private sessionStore: SessionStore;
  private cookieConfig: CookieConfig;

  constructor(private readonly configService: ConfigService) {
    this.cookieConfig = {
      cookieName: configService.get('COOKIE_NAME'),
      cookieSecret: configService.get('COOKIE_SECRET'),
      cookieDomain: configService.get('COOKIE_DOMAIN'),
    };

    this.sessionStore = new SessionStore(
      IORedis({
        host: configService.get('CACHE_SERVER'),
      }),
    );

    this.sessionHandler = CHSessionMiddleware(this.cookieConfig, this.sessionStore);
  }

  public use(req: Request, res: Response, next: () => void) {
    this.prepareSession(req, res);
    return this.sessionHandler(req, res, next);
  }

  private prepareSession(req: Request, res: Response): void {
    if (!req.cookies[this.cookieConfig.cookieName]) {
      const cookie: Cookie = Cookie.createNew(this.configService.get(this.cookieConfig.cookieSecret));

      req.session = new Session({
        '.id': cookie.sessionId,
        signin_info: {
          access_token: {
            access_token: 'abcd',
          },
        },
        expires: Number(Date.now().toPrecision(10)) / 1000 + 3600 * 1000,
      });

      res.cookie(this.cookieConfig.cookieName, cookie.value);

      this.sessionStore.store(cookie, req.session.data, 3600);
    }
  }
}
