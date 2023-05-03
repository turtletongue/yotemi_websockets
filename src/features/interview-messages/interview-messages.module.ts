import { Module } from '@nestjs/common';

import GatewaysModule from '@common/gateways';
import RedisModule from '@common/redis';
import InterviewMessagesGateway from './interview-messages.gateway';
import InterviewMessagesConsumer from './interview-messages.consumer';

@Module({
  imports: [GatewaysModule, RedisModule],
  providers: [InterviewMessagesGateway, InterviewMessagesConsumer],
})
export default class InterviewMessagesModule {}
