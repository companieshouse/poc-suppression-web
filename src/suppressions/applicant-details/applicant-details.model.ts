import { IsEmail, IsNotEmpty, IsIn } from 'class-validator';

export class ApplicantDetailsModel {
  @IsNotEmpty({ message: 'Field must not be empty' })
  public readonly fullName: string;

  @IsEmail({}, { message: 'Invalid Email' })
  public readonly email: string;
}
