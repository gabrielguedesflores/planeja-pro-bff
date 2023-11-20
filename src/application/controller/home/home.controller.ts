import { Controller, Get } from '@nestjs/common';
import { ApiExcludeController, ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('')
export class HomeController {
  @Get()
  @ApiExcludeEndpoint()
  getHello(): string {
    return 'A API está funcionando!';
  }
}
