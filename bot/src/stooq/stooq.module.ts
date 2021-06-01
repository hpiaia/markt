import { HttpModule, Module } from '@nestjs/common';

import { StooqService } from './stooq.service';

@Module({
  imports: [HttpModule],
  providers: [StooqService],
  exports: [StooqService],
})
export class StooqModule {}
