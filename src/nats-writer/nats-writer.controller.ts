import {Controller, Logger} from '@nestjs/common';
import {MessagePattern} from "@nestjs/microservices";
import * as fs from "fs";
import {WriteStream} from "fs";
import {ConfigService} from "@nestjs/config";

@Controller('nats-writer')
export class NatsWriterController {
    constructor(private configService: ConfigService) {}

    private logger = new Logger(NatsWriterController.name);
    private mainPath = this.configService.get('mainPath');
    private byteSize = this.configService.get('highWaterMark');
    private ws: WriteStream;

    @MessagePattern('sendData')
    async saveData(payload: any): Promise<boolean> {
        return await new Promise(resolve => {
            setTimeout(() => {
                try {this.ws.write(Buffer.from(payload));}
                catch (e) {
                    this.logger.error(e)
                }
                resolve(true)
            }, 10)
        })
    }

    @MessagePattern('createStream')
    createStream(payload: string): boolean {
        this.logger.debug(`Create stream for new file ${payload}`);
        this.ws = fs.createWriteStream(`${this.mainPath}copy-${payload}`,
            {highWaterMark: this.byteSize});
        return true;
    }

    @MessagePattern('closeStream')
    closeStream(): boolean {
        this.logger.debug(`Finished current stream`);
        this.ws.close();
        return true
    }

}
