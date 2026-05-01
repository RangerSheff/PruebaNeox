import * as sgMail from '@sendgrid/mail';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class SendGrid implements OnModuleInit {
  private readonly logger = new Logger(SendGrid.name);

  onModuleInit() {
    sgMail.setApiKey(process.env.SEND_GRID_ACCESS_KEY);
  }

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
      await sgMail.send(html);
    } catch (error) {
      this.logger.verbose(error);
    }
    return true;
  }
}
