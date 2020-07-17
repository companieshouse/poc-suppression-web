import {HttpService, Injectable} from "@nestjs/common";
import {Suppression} from "app/suppressions/model/suppression.model";
import {SuppressionResponseModel} from "app/suppressions/model/suppression-response.model";

@Injectable()
export class SuppressionService {
    constructor(private httpService: HttpService) {
    }

    async createSuppression(suppressionSessionData: Suppression): Promise<SuppressionResponseModel | void> {

        const companyNumber: string = suppressionSessionData.documentDetails.companyNumber;

        if (companyNumber === null) {
            console.log('No company Number!');
        }

        const url: string = `http://localhost:3000/companies/${companyNumber}/suppressions`;

        return await this.httpService.post(url,
            JSON.stringify({
                fullName: suppressionSessionData.applicantDetails.fullName,
                email: suppressionSessionData.applicantDetails.email,
                oldAddress: suppressionSessionData.oldAddressDetails,
                newAddress: suppressionSessionData.newAddressDetails,
                document: suppressionSessionData.documentDetails
            }), {
                headers: {
                    // TO-DO add auth header
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .toPromise()
            .then((res) => {
                if (res.status === 201) {
                    const suppressionResponseModel: SuppressionResponseModel = new SuppressionResponseModel();
                    suppressionResponseModel.id = res.data.id;
                    suppressionResponseModel.links = {
                        self: res.data.links.self,
                        payment: res.data.links.payment
                    }
                    return suppressionResponseModel;
                }
            })
            .catch(err => {
                if (err) {
                    console.log(err)
                    throw err;
                }
            });
    }

    async getSuppression(companyNumber: string): Promise<SuppressionResponseModel> {

        const url: string = `http://localhost:3000/companies/${companyNumber}/suppressions`;

        return await this.httpService.get(url)
            .toPromise()
            .then((res) => res.data)
            .catch(err => {
                if (err) {
                    return null;
                }
            })
    }
}
