import { Module } from '@nestjs/common';
import { NatsWriterModule } from './nats-writer/nats-writer.module';
import {ConfigModule} from "@nestjs/config";
import configuration from "./config/configuration";

@Module({
  imports: [NatsWriterModule, ConfigModule.forRoot({
    load: [configuration], isGlobal: true
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
