import { ConfigModule, ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { LoggerModuleAsyncParams } from 'nestjs-pino';

export const loggerMiddlewareOptions: LoggerModuleAsyncParams = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => {
    const isDevelopment = config.get<string>('NODE_ENV') === 'development';
    const isTest = config.get<string>('NODE_ENV') === 'test';

    return {
      pinoHttp: {
        genReqId: (req) => (req.headers['x-header-id'] ? req.headers['x-header-id'] : randomUUID()),
        level: config.get<string>('LOGGER_LEVEL'),
        quietReqLogger: true,
        autoLogging: !isTest,
        transport: isDevelopment ? { target: 'pino-pretty' } : undefined,
        serializers: {
          err: (err) => {
            return {
              message: err.message,
              stack: err.stack,
            };
          },
          req: (obj) => {
            return {
              method: obj.method,
              url: obj.url,
              params: obj.params,
              data: obj.data,
            };
          },
          res: (obj) => {
            return {
              status: obj.statusCode,
              data: obj.statusMessage,
            };
          },
        },
      },
    };
  },
};
