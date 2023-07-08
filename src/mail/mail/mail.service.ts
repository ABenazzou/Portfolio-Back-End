import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendEmailDto } from 'src/dtos/emails.dtos';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendEmail(sendEmailDto: SendEmailDto) {
        console.log(sendEmailDto);
        console.log(process.env.MAIL_PASSWORD);
        console.log(process.env.MAIL_EMAIL);
        console.log(process.env.MAIL_HOST);
        if (sendEmailDto.isCopy) {
            await this.mailerService.sendMail({
                to: 'adnanbenzo194@gmail.com',
                cc: sendEmailDto.email,
                subject: 'Portfolio Contact',
                template: './portfolioContact',
                context: {
                    name: sendEmailDto.name,
                    email: sendEmailDto.email,
                    subject: sendEmailDto.subject,
                    message: sendEmailDto.message
                }
            })
        }
        else {
            await this.mailerService.sendMail({
                to: 'adnanbenzo194@gmail.com',
                subject: 'Portfolio Contact',
                template: './portfolioContact',
                context: {
                    name: sendEmailDto.name,
                    email: sendEmailDto.email,
                    subject: sendEmailDto.subject,
                    message: sendEmailDto.message
                }

            })
        }
    }
}
