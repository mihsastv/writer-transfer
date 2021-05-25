import { Test, TestingModule } from '@nestjs/testing';
import { NatsWriterController } from './nats-writer.controller';

describe('NatsWriterController', () => {
  let controller: NatsWriterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NatsWriterController],
    }).compile();

    controller = module.get<NatsWriterController>(NatsWriterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
