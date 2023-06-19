import { Test } from '@nestjs/testing';
import { PrismaService } from '../../src/prismaService/prisma.service';

describe('PrismaService', () => {
  let prismaService: PrismaService;

  // The beforeEach block is run before each test case. It sets up the test environment.
  beforeEach(async () => {
    // Create a NestJS testing module and get the instance of PrismaService
    const moduleRef = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  // Test cases will go here...
});
