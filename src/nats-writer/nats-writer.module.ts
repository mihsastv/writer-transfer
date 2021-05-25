import {Module} from '@nestjs/common';
import {NatsWriterController} from './nats-writer.controller';
import {ConfigModule} from "@nestjs/config";
import {NatsWriterSocketGateway} from "./nats-writer.socket.gateway";

@Module({
    controllers: [NatsWriterController, ConfigModule],
    providers: [NatsWriterSocketGateway]
})
export class NatsWriterModule {
}
