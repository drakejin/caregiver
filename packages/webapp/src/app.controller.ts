import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index.hbs')
  root() {
    return { message: '핸들바로 출력한다!' };
  }

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
