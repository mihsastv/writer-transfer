import {Logger} from "@nestjs/common";
import {
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway, WebSocketServer
} from "@nestjs/websockets";
import {Server} from 'socket.io';


@WebSocketGateway(8181)
export class NatsWriterSocketGateway implements OnGatewayInit,
    OnGatewayConnection, OnGatewayDisconnect {
    private logger = new Logger(NatsWriterSocketGateway.name);

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('client')
    clientChannel(@MessageBody() data: any): void {
        this.server.emit('client', data);
    }

    @SubscribeMessage('server')
    serverChannel(@MessageBody() data: {cmd: string, payload: any}): void {
        this.server.emit('server', data);
    }

    afterInit(): any {
        this.logger.log('Started Socket IO server');
    }

    handleConnection(client: any, ...args: any[]): any {
        this.logger.log(`Client connected: ${client.id}`);

    }

    handleDisconnect(client: any): any {
        this.logger.log(`Client connected: ${client.id}`);
    }

}
