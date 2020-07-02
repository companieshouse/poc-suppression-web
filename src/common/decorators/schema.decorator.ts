import Joi from '@hapi/joi';
import { SetMetadata, CustomDecorator } from '@nestjs/common';

export const SCHEMA_METADATA_KEY = 'schema:metadata';

export function Schema(schema: Joi.ObjectSchema): CustomDecorator {
  return SetMetadata(SCHEMA_METADATA_KEY, schema);
}
