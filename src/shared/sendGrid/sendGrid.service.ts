import { SendGridService } from '@anchan828/nest-sendgrid';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SendGrid {
  private readonly logger = new Logger(SendGrid.name);
  constructor(private readonly sendGrid: SendGridService) {}

  async sendEmail(email: string, username: string, code: string) {
    const html = {
      to: email,
      from: process.env.EMAIL_EMIT,
      subject: 'User Recovery Password',
      text: `Hello ${username}, your user need help with Secret Code!`,
      html: `<strong>Hello ${username}, your secret code is: ${code}!</strong>`,
    };
    this.logger.verbose(html);
    try {
      await this.sendGrid.send(html);
    } catch (error) {
      this.logger.verbose(error);
    }
    return true;
  }
}
