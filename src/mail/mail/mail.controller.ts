import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { MailService } from './mail.service';
import { SendEmailDto } from 'src/dtos/emails.dtos';

@Controller('api/mail')
export class MailController {
    constructor(private mailService: MailService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async sendMail(@Body() sendEmailDto: SendEmailDto) {
        return this.mailService.sendEmail(sendEmailDto);
    }

}
