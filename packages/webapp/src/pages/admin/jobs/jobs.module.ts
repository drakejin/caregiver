import { Module, Logger } from '@nestjs/common';

import { JobController } from './jobs.controller';

@Module({
  imports: [],
  controllers: [JobController],
  providers: [Logger],
})
export class JobModule {}
