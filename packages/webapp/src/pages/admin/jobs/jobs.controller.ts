import { Controller, Logger, Get, Render } from '@nestjs/common';
@Controller('admin/jobs')
export class JobController {
  constructor(private readonly logger: Logger) {}

  @Get('/')
  @Render('./admin/jobs/list.hbs')
  list() {
    console.log('dd');
    return {
      message: 'wow',
    };
  }
}
