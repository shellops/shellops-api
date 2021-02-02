import { Test, TestingModule } from '@nestjs/testing';

import { DockerController } from './docker.controller';
import { DockerModule } from './docker.module';

describe('DockerController', () => {
  let controller: DockerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DockerModule],
    }).compile();

    controller = module.get<DockerController>(DockerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
