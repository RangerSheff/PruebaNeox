import * as Joi from 'joi';
import { ConfigModuleOptions } from '@nestjs/config';

const configuration = (): any => ({
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  secret_token_jwt: process.env.SECRET_TOKEN_JWT,
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
});

export const configModuleOptions: ConfigModuleOptions = {
  envFilePath: [`.env`],
  load: [configuration],
  validationSchema: Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
    LOGGER_LEVEL: Joi.string().default('debug'),
    LOGGER_PRETTY: Joi.bool().default(false),
    PORT: Joi.number().port().default(3000),
    SECRET_TOKEN_JWT: Joi.string().required(),
    DB_HOST: Joi.string().default('mysql'),
    DB_PORT: Joi.number().port().default(3306),
    DB_USER: Joi.string().default('user_crud'),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().default('db_crud'),
    SEND_GRID_ACCESS_KEY: Joi.string().optional().allow(''),
    EMAIL_EMIT: Joi.string().optional().allow(''),
  }),
};
