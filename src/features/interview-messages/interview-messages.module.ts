import { Module } from '@nestjs/common';

import GatewaysModule from '@common/gateways';
import PubsubModule from '@common/pubsub';
import InterviewMessagesGateway from './interview-messages.gateway';
import InterviewMessagesConsumer from './interview-messages.consumer';

@Module({
  imports: [GatewaysModule, PubsubModule],
  providers: [InterviewMessagesGateway, InterviewMessagesConsumer],
})
export default class InterviewMessagesModule {}
