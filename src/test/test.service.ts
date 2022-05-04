import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { MailerService } from '../mailer/mailer.service';

@Injectable()
export class TestService {
  constructor(
    private readonly mailerService: MailerService,
  ) {}

  async runType1(dto) {
    if(!dto.email) {
      throw new BadRequestException('body에 email 값이 존재해야 합니다.')
    } else {
      const newMail = await this.mailerService.sendTest(dto.email, '테스트 메일입니다', 'signup.ejs')
      return newMail
    }

  }

}
