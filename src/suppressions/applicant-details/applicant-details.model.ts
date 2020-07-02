import { applicantDetailsSchema } from './applicant-details.schema';
import { ValidationErrors } from 'app/common/decorators/validation-errors.decorator';
import { ValidationError } from 'app/common/validation/validation-error.model';
import { Schema } from 'app/common/decorators/schema.decorator';

@Schema(applicantDetailsSchema)
@ValidationErrors<ApplicantDetailsModel>([
  new ValidationError('email', 'Email is invalid'),
  new ValidationError('fullName', 'Full name is invalid'),
  new ValidationError('secureRegister', 'You must select an option'),
])
export class ApplicantDetailsModel {
  constructor(
    public readonly fullName: string,
    public readonly email: string,
    public readonly secureRegister: 'yes' | 'no',
  ) {}
}
