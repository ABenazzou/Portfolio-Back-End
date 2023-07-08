import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendEmailDto } from 'src/dtos/emails.dtos';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService, private configService: ConfigService) { }

    async sendEmail(sendEmailDto: SendEmailDto) {
        console.log(sendEmailDto);
        console.log(this.configService.get('MAIL_PASSWORD'));
        console.log(this.configService.get('MAIL_USER'));
        console.log(this.configService.get('MAIL_HOST'));
        console.log(this.configService.get('DATABASE_HOST'));
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
