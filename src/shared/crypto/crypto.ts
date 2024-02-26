import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
  async hashPassword(password: string): Promise<string> {
    const hash = crypto.createHash('sha256');
    hash.update(password.toString());
    const hashedPasswordHex = hash.digest('hex');
    return hashedPasswordHex;
  }

  async comparePassword(password: string, passwordBD: string): Promise<boolean> {
    const hashedPassword = await this.hashPassword(password);
    return passwordBD === hashedPassword;
  }
}
