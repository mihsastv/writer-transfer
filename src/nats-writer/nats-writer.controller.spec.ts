import {Test, TestingModule} from '@nestjs/testing';
import {NatsWriterController} from './nats-writer.controller';
import {ConfigService} from "@nestjs/config";

describe('NatsWriterController', () => {
    let controller: NatsWriterController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [NatsWriterController],
            providers: [ConfigService]
        }).compile();

        controller = module.get<NatsWriterController>(NatsWriterController);
    });
    describe('NatsWriterController testing', () => {
        it('should be defined', () => {
            expect(controller).toBeDefined();
        });

        it('should be defined function', () => {
            expect(controller.createStream).toBeDefined();
            expect(controller.closeStream).toBeDefined();
            expect(controller.saveData).toBeDefined();
        });

        it('should return result createStream', async () => {
            expect(await controller.createStream('test.zip')).toBeTruthy();
        });

        it('should return result closeStream', async () => {
            expect(await controller.createStream('test.zip')).toBeTruthy();
        });

        it('should return result sendData', async () => {
            const result = true
            const resultPromise = new Promise<boolean>(resolve => resolve(result));
            jest.spyOn(controller, 'saveData').mockImplementation(() => resultPromise.then(res => res));
            expect(await controller.saveData({type: 'Buffer', data: []})).toEqual(result);
        });
    })


});
