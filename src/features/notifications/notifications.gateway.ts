import { Injectable } from '@nestjs/common';

import { BaseGateway } from '@common/gateways';
import { Id } from '@app/app.declarations';
import PlainNotification from './plain-notification';
import { FOLLOWING_NOTIFICATIONS } from './notifications.constants';

@Injectable()
export default class NotificationsGateway {
  constructor(private readonly baseGateway: BaseGateway) {}

  public sendNotification(userId: Id, notification: PlainNotification): void {
    if (FOLLOWING_NOTIFICATIONS.includes(notification.type)) {
      this.baseGateway.server
        .to(`followers-of-${userId}`)
        .emit('notification.created', notification);

      return;
    }

    this.baseGateway.server
      .to(`user-${userId}`)
      .emit('notification.created', notification);
  }

  public updateNotification(userId: Id, notification: PlainNotification): void {
    if (FOLLOWING_NOTIFICATIONS.includes(notification.type)) {
      this.baseGateway.server
        .to(`followers-of-${userId}`)
        .emit('notification.updated', notification);

      return;
    }

    this.baseGateway.server
      .to(`user-${userId}`)
      .emit('notification.updated', notification);
  }
}
