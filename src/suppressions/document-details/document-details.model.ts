import {IsNotEmpty} from 'class-validator';

export class DocumentDetailsModel {
  @IsNotEmpty({ message: 'Field must not be empty' })
  public readonly companyName: string;

  @IsNotEmpty({ message: 'Field must not be empty' })
  public readonly companyNumber: string;

  @IsNotEmpty({ message: 'Field must not be empty' })
  public readonly type: string;

}
