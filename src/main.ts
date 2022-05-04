import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const corsOptions = {
		origin: [
			'https://test.dahyeon.us',
      'https://api.dahyeon.us',
      'https://dahyeon.us',
		],
		methods: 'GET,OPTIONS,PUT,PATCH,POST,DELETE',
		allowedHeaders: ['Content-Type', 'Authorization'],
		//transports: ['websocket', 'polling'],
		exposedHeaders: ['Content-Type'],
		credentials: true,
	};
  const validationPipeOptions = {
		whitelist: true,
		forbidNonWhitelisted: true,
		transform: true,
		disableErrorMessages: false,
	};

  try {
    const httpsOptions = {
			key: fs.readFileSync('./secrets/dahyeon.us.key', 'utf8'),
			cert: fs.readFileSync('./secrets/dahyeon.us.crt', 'utf8'),
			ca: fs.readFileSync('./secrets/dahyeon.us.cacerts.cer', 'utf-8')
		};
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
			httpsOptions,
			logger: ['error', 'warn', 'log', 'debug', 'verbose'],
		});
    app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
		app.enableCors(corsOptions);
    await app.listen(443);
		console.log(`https server runnning on port 443`);
  } catch(err) {
    console.log(err)
  }
}
bootstrap();
