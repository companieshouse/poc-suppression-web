import * as Joi from '@hapi/joi';
import { ApplicantDetailsModel } from './applicant-details.model';

export const applicantDetailsSchema = Joi.object<ApplicantDetailsModel>({
  email: Joi.string().exist(),
  fullName: Joi.string().exist(),
  secureRegister: Joi.string()
    .exist()
    .valid('yes', 'no'),
});
