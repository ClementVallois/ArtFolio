import { Test, TestingModule } from '@nestjs/testing';
import { DataRequestController } from './data-request.controller';
import { DataRequestService } from '../../application/data-request/data-request.service';

describe('DataRequestController', () => {
  let controller: DataRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataRequestController],
      providers: [DataRequestService],
    }).compile();

    controller = module.get<DataRequestController>(DataRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
