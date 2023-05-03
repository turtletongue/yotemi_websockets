import { Module } from '@nestjs/common';

import GatewaysModule from '@common/gateways';
import PubsubModule from '@common/pubsub';
import NotificationsGateway from './notifications.gateway';
import NotificationsConsumer from './notifications.consumer';

@Module({
  imports: [GatewaysModule, PubsubModule],
  providers: [NotificationsGateway, NotificationsConsumer],
})
export default class NotificationsModule {}
