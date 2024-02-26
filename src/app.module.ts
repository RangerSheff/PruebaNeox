import { Module } from '@nestjs/common';
import { HealthController } from './health/health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './authentication/auth.module';

@Module({
  imports: [
    AuthModule,
    SharedModule,
    UserModule,
    TerminusModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'user_crud',
      password: 'root',
      database: 'db_crud',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
