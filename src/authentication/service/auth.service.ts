import { UserService } from '@app/user/service/user.service';
import { Injectable, Logger } from '@nestjs/common';
import { loginRequest } from '../dto/auth.dto';
import { CryptoService } from '@app/shared/crypto/crypto';
import { JwtService } from '@nestjs/jwt';
import {
  AUTH_EMAIL_FAIL,
  AUTH_INNACTIVE_USER,
  AUTH_JWT_FAIL,
  AUTH_PASSWORD_FAIL,
  AUTH_SUCCESS,
  RECOVERY_GENERATE_CODE_FAIL,
  RECOVERY_SEND_EMAIL_FAIL,
  RECOVERY_SUCCESS,
  VALIDATE_EMAIL_FAIL,
  VALIDATE_GENERATE_CODE_EMAIL_FAIL,
  VALIDATE_SUCCESS,
  VALIDATE_UPDATE_PASSWORD_FAIL,
} from '../constants/response.constants';
import { SendGrid } from '@app/shared/sendGrid/sendGrid.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly crypto: CryptoService,
    private readonly jwt: JwtService,
    private readonly sendGrid: SendGrid,
  ) {}

  private async generateCode(email: string, username: string) {
    const emailUsuario = email + '|' + username;
    const buffer = Buffer.from(emailUsuario, 'utf-8');
    const encodedHex = buffer.toString('hex');
    return encodedHex;
  }

  private async compareGenerateCode(email: string, username: string, code: string): Promise<boolean> {
    const hashedPassword = await this.generateCode(email, username);
    return code === hashedPassword;
  }

  async login({ email, password }: loginRequest) {
    const { data: user } = await this.userService.findOne(email);
    if (!user) return AUTH_EMAIL_FAIL;

    const isPassword = await this.crypto.comparePassword(password, user.password);
    if (!isPassword) return AUTH_PASSWORD_FAIL;

    if (!user.active) return AUTH_INNACTIVE_USER;

    const token = await this.jwt.signAsync({ email: user.email });
    if (!token) return AUTH_JWT_FAIL;
    AUTH_SUCCESS.data = { email: user.email, active: '30 minutes', JWT: token };
    return AUTH_SUCCESS;
  }

  async recoveryEmail(email: string) {
    const { data: user } = await this.userService.findOne(email);
    if (!user) return AUTH_EMAIL_FAIL;

    const generateCode = await this.generateCode(user.email, user.username);
    if (!generateCode) return RECOVERY_GENERATE_CODE_FAIL;

    const sendCode = await this.sendGrid.sendEmail(user.email, user.username, generateCode);
    if (!sendCode) return RECOVERY_SEND_EMAIL_FAIL;

    return RECOVERY_SUCCESS;
  }

  async validateRecoveryPass(email: string, code: string, newPassword: string) {
    const { data: user } = await this.userService.findOne(email);
    if (!user) return VALIDATE_EMAIL_FAIL;

    const isGenerateCode = await this.compareGenerateCode(user.email, user.username, code);
    if (!isGenerateCode) return VALIDATE_GENERATE_CODE_EMAIL_FAIL;

    const updatePassword = await this.userService.update(email, { password: newPassword, active: true }, false);
    if (!updatePassword) return VALIDATE_UPDATE_PASSWORD_FAIL;

    return VALIDATE_SUCCESS;
  }
}
