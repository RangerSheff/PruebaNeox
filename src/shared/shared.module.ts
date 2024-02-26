import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { loggerMiddlewareOptions } from './config/logger-middleware.options';
import { configModuleOptions } from './config/configuration.options';
import { CryptoService } from './crypto/crypto';
import { SendGrid } from './sendGrid/sendGrid.service';
import { SendGridModule } from '@anchan828/nest-sendgrid';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    LoggerModule.forRootAsync(loggerMiddlewareOptions),
    SendGridModule.forRoot({ apikey: process.env.SEND_GRID_ACCESS_KEY }),
  ],
  providers: [CryptoService, SendGrid],
  exports: [ConfigModule, LoggerModule, CryptoService, SendGrid],
})
export class SharedModule {}
