import { BadRequestException, Injectable, BadGatewayException, InternalServerErrorException } from '@nestjs/common';
import * as mailer  from '@nestjs-modules/mailer';

@Injectable()
export class MailerService {
    constructor(private readonly mailer: mailer.MailerService) {}


    async sendTest(
        to: string,
        subject: string,
        templateName: string,
        context: any = {},
    ): Promise<object> {
        const newMail = await this.mailer.sendMail({
            to: to,
            subject,
            template: `${templateName}`,
            context,
        })
        console.log(newMail)
        if(newMail && newMail.response.split(' ')[1] === 'Ok'){
            return new Object({ message: 'an confirmation letter has been sent' })
        } else {
            return new InternalServerErrorException('service unavailable(mailer)')
        }

    }

}
