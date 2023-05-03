import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import jwtConfig from '@config/jwt.config';
import BaseGateway from './base.gateway';

@Module({
  imports: [JwtModule, ConfigModule.forFeature(jwtConfig)],
  providers: [BaseGateway],
  exports: [BaseGateway],
})
export default class GatewaysModule {}
