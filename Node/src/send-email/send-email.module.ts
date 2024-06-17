import { Module } from '@nestjs/common';
import { SendEmailService } from './send-email.service';
import { SendEmailController } from './send-email.controller';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({

        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          pool:true,
          secure: true,
          
          auth: {
            user: 'schoolSystem515@gmail.com',
            pass: 'gtswrkcfpiwyxylb',
          },
          tls: {
            rejectUnauthorized: false,
          },
        },
        defaults: {
          from: '"Parent - Teacher" <schoolSystem515@gmail.com>',
        },
        preview: true,
      }),
  ],
  controllers: [SendEmailController],
  providers: [SendEmailService]
})
export class SendEmailModule { }
