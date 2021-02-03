import { Test, TestingModule } from '@nestjs/testing';

import { DockerService } from './docker.service';
import {DockerModule} from './docker.module';

describe('DockerService', () => {
  let service: DockerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports : [DockerModule],
    }).compile();

    service = module.get<DockerService>(DockerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
