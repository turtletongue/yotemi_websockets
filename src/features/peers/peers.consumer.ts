import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { PubsubService } from '@common/pubsub';
import { Id } from '@app/app.declarations';
import PeersGateway from './peers.gateway';

interface PeerData {
  userId: Id;
  interviewId: Id;
}

@Injectable()
export default class PeersConsumer implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly peersGateway: PeersGateway,
    private readonly pubsub: PubsubService,
  ) {}

  public async muteAudio(data: PeerData): Promise<void> {
    await this.peersGateway.sendAudioMuted(data.userId, data.interviewId);
  }

  public async unmuteAudio(data: PeerData): Promise<void> {
    await this.peersGateway.sendAudioUnmuted(data.userId, data.interviewId);
  }

  public async muteVideo(data: PeerData): Promise<void> {
    await this.peersGateway.sendVideoMuted(data.userId, data.interviewId);
  }

  public async unmuteVideo(data: PeerData): Promise<void> {
    await this.peersGateway.sendVideoUnmuted(data.userId, data.interviewId);
  }

  public async disconnect(data: PeerData): Promise<void> {
    await this.peersGateway.sendDisconnected(data.userId, data.interviewId);
  }

  public async onModuleInit(): Promise<void> {
    const client = this.pubsub.getClient();

    await client.subscribe('peer-mute-audio', (data) => {
      this.muteAudio(JSON.parse(data));
    });

    await client.subscribe('peer-unmute-audio', (data) => {
      this.unmuteAudio(JSON.parse(data));
    });

    await client.subscribe('peer-mute-video', (data) => {
      this.muteVideo(JSON.parse(data));
    });

    await client.subscribe('peer-unmute-video', (data) => {
      this.unmuteVideo(JSON.parse(data));
    });

    await client.subscribe('peer-disconnect', (data) => {
      this.disconnect(JSON.parse(data));
    });
  }

  public async onModuleDestroy(): Promise<void> {
    const client = this.pubsub.getClient();

    await client.unsubscribe('peer-mute-audio');

    await client.unsubscribe('peer-unmute-audio');

    await client.unsubscribe('peer-mute-video');

    await client.unsubscribe('peer-unmute-video');

    await client.unsubscribe('peer-disconnect');
  }
}
