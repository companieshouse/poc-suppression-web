import {HttpService, Injectable} from "@nestjs/common";

@Injectable()
export class PaymentService {

    constructor(private httpService: HttpService) {
    }

    async initPayment(ref: string, companyNumber: string): Promise<string> {

        const url: string = 'http://payment-host/payments';

        const request: any = {
            reference: ref,
            state: 'someState',
            resource: `http://localhost/companies/${companyNumber}/suppressions/${ref}/payment`,
            redirect_uri: 'http://localhost/suppress-my-details/confirmation'
        };

        return await this.httpService.post(url, request, { headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + '3uqsxiEIgp2zTZsdUkUDE6oSzzKO1bGOritBHA9286yV6GBXANPcQ2JW9DcUE7jTS4sLOZAKe-ORKOI2z5qShg'
            }})
            .toPromise()
            .then((res) => {
                if (res.status === 201) {
                    const data = res.data;
                    return data.links.journey;
                }
            })
            .catch(err => {
                if (err) {
                    console.log(err)
                    throw err;
                }
            });
    }

}
