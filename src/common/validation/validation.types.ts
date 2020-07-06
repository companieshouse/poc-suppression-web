import { TemplateValidationError } from './validation-error.model';
export type ValidationResult<T> = {
  [K in keyof T]?: TemplateValidationError | undefined;
};
