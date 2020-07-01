import { Controller, Render, Get, Post, Redirect } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { LANDING_PAGE_URI, APPLICANT_DETAILS_URI } from 'src/routes/routes.constants';

@Controller(LANDING_PAGE_URI)
export class LandingController extends BaseController {

    constructor() {
        super('service/start', {
            next: () => APPLICANT_DETAILS_URI,
            previous: () => LANDING_PAGE_URI
        });
    }
}
