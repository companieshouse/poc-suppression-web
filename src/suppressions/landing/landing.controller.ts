import { Controller } from '@nestjs/common';
import { BaseController } from 'app/common/controllers/base.controller';
import { LANDING_PAGE_URI, APPLICANT_DETAILS_URI } from 'app/common/routes/routes.constants';
import { NavigationControl } from 'app/common/navigation/navigation-control';

@Controller(LANDING_PAGE_URI)
export class LandingController extends BaseController {
  constructor() {
    super('start', new NavigationControl(LANDING_PAGE_URI, APPLICANT_DETAILS_URI));
  }
}
