import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentReferenceService {

    public generateNewReference(numberOfDigits: number): string {
        const number = String(Number(Math.random() * Math.pow(10, numberOfDigits)).toFixed());
        return number.padStart(numberOfDigits, '0');
    }
}
