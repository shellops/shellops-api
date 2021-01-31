import { Test, TestingModule } from '@nestjs/testing';
import { DockerService } from './docker.service';

describe('DockerService', () => {
  let service: DockerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DockerService],
    }).compile();

    service = module.get<DockerService>(DockerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
