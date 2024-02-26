import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { loginRequest, recoveryRequest, validateRecovery } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly auth: AuthService) {}

  @Post('login')
  async loginUser(@Body() login: loginRequest) {
    this.logger.verbose(login);
    return await this.auth.login(login);
  }

  @Post('recovery')
  async recovery(@Body() recovery: recoveryRequest) {
    this.logger.verbose(recovery);
    return await this.auth.recoveryEmail(recovery.email);
  }

  @Post('validate')
  async validate(@Body() validate: validateRecovery) {
    this.logger.verbose(validate);
    return await this.auth.validateRecoveryPass(validate.email, validate.code, validate.password);
  }
}
