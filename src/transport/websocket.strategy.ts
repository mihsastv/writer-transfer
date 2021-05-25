import {CustomTransportStrategy, Server} from "@nestjs/microservices";
import * as socketClient from "socket.io-client";
import {Logger} from "@nestjs/common";

export class WebsocketPubSubServer
    extends Server
    implements CustomTransportStrategy {
    private socket: socketClient.Socket;

    async listen(callback: () => void) {
        const logger = new Logger(WebsocketPubSubServer.name)
        this.socket = socketClient("http://localhost:8181");

        this.socket.on('connect', function () {
            logger.log('Connect socketIo from WebsocketPubSubServer');
        });
        this.socket.on('server', async (data: { pattern: any, payload?: any }) => {
            const echoHandler = this.messageHandlers.get(data.pattern);
            if (echoHandler) {
                const res = await echoHandler(data?.payload);
                this.socket.emit('client', res);
            } else {
                logger.error(`pattern ${data.pattern} not found`)
            }
        })
        callback();
    }

    close() {
        this.socket.close();
    }
}
