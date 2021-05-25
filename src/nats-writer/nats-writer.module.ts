import { Module } from '@nestjs/common';
import { NatsWriterController } from './nats-writer.controller';

@Module({
  controllers: [NatsWriterController]
})
export class NatsWriterModule {}
