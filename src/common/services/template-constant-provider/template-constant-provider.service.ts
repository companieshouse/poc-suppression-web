import { Injectable } from '@nestjs/common';

@Injectable()
export class TemplateConstantProviderService {
    public getServiceConstants(): any {
        return {
            serviceName: 'Apply to remove your home address from the Companies House register (SR01)'
        }
    }
}
