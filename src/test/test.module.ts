import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { MailerService } from 'src/mailer/mailer.service';

@Module({
  imports: [MailerService],
  controllers: [TestController],
  providers: [TestService, MailerService]
})
export class TestModule {}
