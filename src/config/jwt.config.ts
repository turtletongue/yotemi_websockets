import { registerAs } from '@nestjs/config';
import Joi from 'joi';

export interface JwtConfig {
  access: {
    secret: string;
    expiresIn: number;
  };
}

const JWT_SECRET_MIN_LENGTH = 25;

const schema = Joi.object({
  access: Joi.object({
    secret: Joi.string().min(JWT_SECRET_MIN_LENGTH).required(),
    expiresIn: Joi.number().integer().required(),
  }),
});

export default registerAs<JwtConfig>('jwt', () => {
  const config = {
    access: {
      secret: process.env.ACCESS_SECRET,
      expiresIn: process.env.ACCESS_EXPIRATION_TIME,
    },
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
