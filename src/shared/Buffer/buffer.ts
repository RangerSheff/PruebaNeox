import { Logger } from '@nestjs/common';

export class Buffer64 {
  private readonly logger = new Logger(Buffer64.name);
  constructor() {}

  async encript64(value: string) {
    const encripted = await Buffer.from(value).toString('base64');
    this.logger.verbose(encripted);
    return encripted;
  }

  async decode64(value: string) {
    const encripted = await Buffer.from(value, 'base64');
    this.logger.verbose(encripted);
    return encripted;
  }
}
