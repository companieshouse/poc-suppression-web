import { TemplateValidationError } from 'app/common/validation/validation-error.model';
export type ValidationResult<T> = {
  [K in keyof T]?: TemplateValidationError | undefined;
};
