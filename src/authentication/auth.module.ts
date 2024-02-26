import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { UserModule } from '@app/user/user.module';
import { SharedModule } from '@app/shared/shared.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.contants';

@Module({
  imports: [
    UserModule,
    SharedModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
