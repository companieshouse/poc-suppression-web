import { IsNotEmpty } from 'class-validator';

export class AddressDetailsModel {
  @IsNotEmpty({ message: 'First line of address should not be empty' })
  public readonly addressLine1: string;

  @IsNotEmpty({ message: 'Second line of address should not be empty' })
  public readonly addressLine2: string;

  @IsNotEmpty({ message: 'Town or city should not be empty' })
  public readonly townOrCity: string;

  @IsNotEmpty({ message: 'County should not be empty' })
  public readonly county: string;

  @IsNotEmpty({ message: 'Postal Code should not be empty' })
  public readonly postCode: string;
}
