import { Module } from '@nestjs/common';

import GatewaysModule from '@common/gateways';
import RedisModule from '@common/redis';
import PeersGateway from './peers.gateway';
import PeersConsumer from './peers.consumer';

@Module({
  imports: [GatewaysModule, RedisModule],
  providers: [PeersGateway, PeersConsumer],
})
export default class PeersModule {}
