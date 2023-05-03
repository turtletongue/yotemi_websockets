import { registerAs } from '@nestjs/config';
import Joi from 'joi';

export interface PubsubConfig {
  connection: string;
}

const schema = Joi.object({
  connection: Joi.string().required(),
});

export default registerAs<PubsubConfig>('pubsub', () => {
  const config = {
    connection: process.env.PUBSUB_CONNECTION,
  };

  const validationResult = schema.validate(config, {
    abortEarly: true,
    allowUnknown: false,
    convert: true,
  });

  if (validationResult.error) {
    throw validationResult.error;
  }

  return validationResult.value;
});
