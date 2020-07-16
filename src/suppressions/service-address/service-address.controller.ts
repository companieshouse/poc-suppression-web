import {
    Body,
    Controller,
    Post,
    Redirect,
    Req,
    UseFilters,
    UsePipes,
    ValidationError,
    ValidationPipe
} from '@nestjs/common';
import {SERVICE_ADDRESS_PAGE_URI, DOCUMENT_DETAILS_URI, PAYMENT_PAGE_URI} from 'app/common/routes/routes.constants';
import {BaseController} from 'app/common/controllers/base.controller';
import {NavigationControl} from 'app/common/navigation/navigation-control';
import {Request} from "express";
import {APP_SESSION_DATA_KEY} from "app/app.module";
import {SuppressionService} from "app/common/services/suppression.service";
import {Suppression} from "app/suppressions/model/suppression.model";
import {Session} from "ch-node-session-handler";
import {AddressDetailsModel} from "app/suppressions/address-details/address-details.model";
import {TypedUnprocessableEntityException} from "app/common/exceptions/typed-unprocessable-entity.exception";
import {ModelValidationExceptionFilter} from "app/common/filters/model-validation-exception.filter";
import {SuppressionResponseModel} from "app/suppressions/model/suppression-response.model";

const template = 'service-address';
const navigation = new NavigationControl(DOCUMENT_DETAILS_URI, PAYMENT_PAGE_URI);

@Controller(SERVICE_ADDRESS_PAGE_URI)
export class ServiceAddressController extends BaseController {
    constructor(private suppressionService: SuppressionService) {
        super(template, navigation);
    }

    @Post()
    @UsePipes(
        new ValidationPipe({
            forbidUnknownValues: true,
            exceptionFactory: (err: ValidationError[]) =>
                new TypedUnprocessableEntityException<ServiceAddressController>(err),
        }),
    )
    @UseFilters(new ModelValidationExceptionFilter({template, navigation}))
    @Redirect(navigation.next())
    public async onPost(@Body() newAddressDetails: AddressDetailsModel, @Req() request: Request): Promise<void> {

        this.addToSession(APP_SESSION_DATA_KEY, request, {
            newAddressDetails: newAddressDetails
        });
      // TO-DO get access token for API call

        const response: SuppressionResponseModel | void = await this.suppressionService.createSuppression(this.onGetModelData(request))

        if (response) {
            this.addToSession(APP_SESSION_DATA_KEY, request, {
                reference: response.id,
                links: response.links
            });
        }
    }

    public onGetModelDataFromSession(session: Session | undefined): Suppression | {} {

        return session?.getExtraData<Suppression>(APP_SESSION_DATA_KEY) || {};
    }

}
