import { Injectable } from '@nestjs/common';
import { BASE_URI } from 'src/common/routes/routes.constants';

@Injectable()
export class TemplateConstantProviderService {
    public getServiceConstants(): any {
        return {
            serviceName: 'Apply to remove your home address from the Companies House register (SR01)',
            baseURI: BASE_URI
        }
    }
}
