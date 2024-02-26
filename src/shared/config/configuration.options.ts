import * as Joi from 'joi';
import { ConfigModuleOptions } from '@nestjs/config';

const configuration = (): any => ({
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  secret_token_jwt: process.env.SECRET_TOKEN_JWT,
});

export const configModuleOptions: ConfigModuleOptions = {
  envFilePath: [`.env`],
  load: [configuration],
  validationSchema: Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
    LOGGER_LEVEL: Joi.string().default('debug'),
    LOGGER_PRETTY: Joi.bool().default(false),
    PORT: Joi.number().port().default(3000),
    SECRET_TOKEN_JWT: Joi.string().required().default('Neox'),
  }),
};
