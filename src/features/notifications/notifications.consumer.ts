import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { PubsubService } from '@common/pubsub';
import { Id } from '@app/app.declarations';
import NotificationsGateway from './notifications.gateway';
import PlainNotification from './plain-notification';

interface NotificationData {
  userId: Id;
  notification: PlainNotification;
}

@Injectable()
export default class NotificationsConsumer
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    private readonly notificationsGateway: NotificationsGateway,
    private readonly pubsub: PubsubService,
  ) {}

  public async send(data: NotificationData): Promise<void> {
    await this.notificationsGateway.sendNotification(
      data.userId,
      data.notification,
    );
  }

  public async update(data: NotificationData): Promise<void> {
    await this.notificationsGateway.updateNotification(
      data.userId,
      data.notification,
    );
  }

  public async onModuleInit(): Promise<void> {
    const client = this.pubsub.getClient();

    await client.subscribe('send-notification', (data) => {
      this.send(JSON.parse(data));
    });

    await client.subscribe('update-notification', (data) => {
      this.send(JSON.parse(data));
    });
  }

  public async onModuleDestroy(): Promise<void> {
    const client = this.pubsub.getClient();

    await client.unsubscribe('send-notification');

    await client.unsubscribe('update-notification');
  }
}
