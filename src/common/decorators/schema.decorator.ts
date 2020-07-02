import Joi from '@hapi/joi';
import { SetMetadata } from '@nestjs/common';

export const SCHEMA_METADATA_KEY = 'schema:metadata'

export function Schema(schema: Joi.ObjectSchema) {
    return SetMetadata(SCHEMA_METADATA_KEY, schema);
}