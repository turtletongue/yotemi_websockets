import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

import jwtConfig from '@config/jwt.config';
import { ANONYMOUS_SOCKET_ROOM } from '@app/app.constants';
import { Id } from '@app/app.declarations';
import gatewayOptions from './gateway.options';

type JwtPayloadData =
  | {
      kind: 'user';
      executor: { id: Id; followingsIds: Id[] };
    }
  | { kind: 'admin'; executor: { id: Id } };

@WebSocketGateway(gatewayOptions)
export default class BaseGateway implements OnGatewayConnection {
  @WebSocketServer()
  public server: Server;

  constructor(
    @Inject(jwtConfig.KEY)
    private readonly config: ConfigType<typeof jwtConfig>,
    private readonly jwt: JwtService,
  ) {}

  public async handleConnection(client: Socket) {
    if (!client.handshake.auth?.token) {
      return client.join(ANONYMOUS_SOCKET_ROOM);
    }

    const user = await this.getUserFromToken(client.handshake.auth.token);

    if (!user) {
      return;
    }

    if (user.kind === 'admin') {
      return client.join('admins');
    }

    user.executor.followingsIds.forEach((followingId) => {
      client.join(`followers-of-${followingId}`);
    });

    return client.join(`user-${user.executor.id}`);
  }

  private async getUserFromToken(
    tokenQuery: string | string[],
  ): Promise<JwtPayloadData> {
    const token = Array.isArray(tokenQuery) ? tokenQuery[0] : tokenQuery;

    return await this.jwt
      .verifyAsync(token, {
        secret: this.config.access.secret,
        ignoreExpiration: false,
      })
      .catch(() => null);
  }
}
