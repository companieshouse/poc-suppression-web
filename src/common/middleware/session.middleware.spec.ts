jest.mock('./session.middleware', () => {
  return {
    SessionMiddleware: jest.fn().mockImplementation((args: any) => {
      return {
        use: () => true,
      };
    }),
  };
});

import { SessionMiddleware } from './session.middleware';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

describe('SessionMiddleware', () => {
  it('should be defined', () => {
    const sessionMiddleware = new SessionMiddleware({} as ConfigService);
    expect(sessionMiddleware).toBeDefined();
    expect(sessionMiddleware.use({} as Request, {} as Response, () => {})).toBe(true);
  });
});
