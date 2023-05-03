import { Module } from '@nestjs/common';

import GatewaysModule from '@common/gateways';
import PubsubModule from '@common/pubsub';
import PeersGateway from './peers.gateway';
import PeersConsumer from './peers.consumer';

@Module({
  imports: [GatewaysModule, PubsubModule],
  providers: [PeersGateway, PeersConsumer],
})
export default class PeersModule {}
