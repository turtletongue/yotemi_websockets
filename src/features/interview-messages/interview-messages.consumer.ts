import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { RedisService } from '@common/redis';
import { Id } from '@app/app.declarations';
import InterviewMessagesGateway from './interview-messages.gateway';
import PlainInterviewMessage from './plain-interview-message';

interface SendMessageData {
  userId: Id;
  message: PlainInterviewMessage;
}

export default class InterviewMessagesConsumer
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    private readonly interviewMessagesGateway: InterviewMessagesGateway,
    private readonly redis: RedisService,
  ) {}

  public async send(data: SendMessageData): Promise<void> {
    await this.interviewMessagesGateway.sendInterviewMessage(
      data.userId,
      data.message,
    );
  }

  public async onModuleInit(): Promise<void> {
    const client = this.redis.getClient();

    await client.subscribe('send-interview-message', (data) => {
      this.send(JSON.parse(data));
    });
  }

  public async onModuleDestroy(): Promise<void> {
    const client = this.redis.getClient();

    await client.unsubscribe('send-interview-message');
  }
}