import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {Logger} from "@nestjs/common";
import configuration from "./config/configuration";
import {WebsocketPubSubServer} from "./transport/websocket.strategy";

async function bootstrap() {
  const logger = new Logger('StarApp')
  const appWs = NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    strategy: new WebsocketPubSubServer(),
  });
  const appNats = NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.NATS,
    options: {
      url: configuration().natsUrl,
    },
  });
  const app = configuration().selectTransport ? await appWs : await appNats
  app.listen(() => logger.log('Microservice writer is listening'));
}
bootstrap();
