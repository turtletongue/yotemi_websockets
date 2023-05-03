import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import appConfig from '@config/app.config';
import InterviewMessagesModule from '@features/interview-messages';
import NotificationsModule from '@features/notifications';
import PeersModule from '@features/peers';

@Module({
  imports: [
    ConfigModule.forFeature(appConfig),
    InterviewMessagesModule,
    NotificationsModule,
    PeersModule,
  ],
})
export class AppModule {}
