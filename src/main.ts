import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

import { AppConfig } from '@config/app.config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService).get<AppConfig>('app');

  if (config.environment === 'production') {
    app.use(helmet());
  }

  await app.listen(config.port);
}

bootstrap().then();
