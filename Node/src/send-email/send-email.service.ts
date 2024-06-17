import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SendEmailService {
    constructor(private readonly mailerService: MailerService) { }

    public sendEmail(to: string, subject: string, text: string): void {
        
        this.mailerService
            .sendMail({
                to, // list of receivers
                from: '"הורה - מורה" <schoolSystem515@gmail.com>', // sender address
                subject:subject, // Subject line
                text:text, // plaintext body
                html: '<b>' + text + '</b> '
            })
            .then(() => {
                console.log('Sent email successfully');
            })
            .catch((e) => {
                console.log('Failed to send email:', e);
            });
    }
}
