import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import * as path from 'path'

@Module({
  imports: [TestModule, 
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MailerModule.forRootAsync({
			useFactory: (): object => {
				return {
					transport: process.env.EMAIL_ADMIN_AUTH,
					defaults: {
						from: process.env.EMAIL_ADMIN_SENDERINFO,
					},
					template: {
						dir: path.join(__dirname, '/templates/'),
						adapter: new EjsAdapter(),
						options: {
							strict: true,
						},
					},
				};
			},
		}),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
