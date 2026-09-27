import { Module, Global } from '@nestjs/common';
import { ClassRealtimeGateway } from './class-realtime.gateway';

@Global()
@Module({
  providers: [ClassRealtimeGateway],
  exports: [ClassRealtimeGateway],
})
export class SocketModule {}
