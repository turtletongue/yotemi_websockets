import { Module } from '@nestjs/common';

import GatewaysModule from '@common/gateways';
import RedisModule from '@common/redis';
import NotificationsGateway from './notifications.gateway';
import NotificationsConsumer from './notifications.consumer';

@Module({
  imports: [GatewaysModule, RedisModule],
  providers: [NotificationsGateway, NotificationsConsumer],
})
export default class NotificationsModule {}
