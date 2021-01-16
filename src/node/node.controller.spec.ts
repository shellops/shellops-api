import { Test, TestingModule } from '@nestjs/testing';
import { NodeController } from './node.controller';

describe('NodeController', () => {
  let controller: NodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NodeController],
    }).compile();

    controller = module.get<NodeController>(NodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
