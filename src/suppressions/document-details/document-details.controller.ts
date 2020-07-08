import { Controller } from '@nestjs/common';
import {
  DOCUMENT_DETAILS_URI,
  ADDRESS_DETAILS_URI,
  SERVICE_ADDRESS_PAGE_URI,
} from 'app/common/routes/routes.constants';
import { BaseController } from 'app/common/controllers/base.controller';
import { NavigationControl } from 'app/common/navigation/navigation-control';

@Controller(DOCUMENT_DETAILS_URI)
export class DocumentDetailsController extends BaseController {
  constructor() {
    super('document-details', new NavigationControl(ADDRESS_DETAILS_URI, SERVICE_ADDRESS_PAGE_URI));
  }
}
