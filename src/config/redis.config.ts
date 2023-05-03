import { registerAs } from '@nestjs/config';
import Joi from 'joi';

export interface RedisConfig {
  connection: string;
}

const schema = Joi.object({
  connection: Joi.string().required(),
});

export default registerAs<RedisConfig>('redis', () => {
  const config = {
    connection: process.env.REDIS_CONNECTION,
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
