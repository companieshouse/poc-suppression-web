import * as Joi from '@hapi/joi';
import { ApplicantDetailsModel } from './applicant-details.model';

export const applicantDetailsSchema = Joi.object<ApplicantDetailsModel>({
    email: Joi.string().not(''),
    fullName: Joi.string().not('')
})