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
					transport: {
            host: process.env.SMTP_ENDPOINT,
            port: 25,
            secure: false,
            auth: {
              user: process.env.SMTP_ID,
              pass: process.env.SMTP_PWD,
            }
          },
					defaults: {
						from: 'contact@dahyeon.us',
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
