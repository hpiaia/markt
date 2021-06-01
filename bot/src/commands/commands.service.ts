import { Injectable } from '@nestjs/common';
import { StooqService } from 'src/stooq/stooq.service';

@Injectable()
export class CommandsService {
  constructor(private readonly stooqService: StooqService) {}

  stock(stockId: string) {
    return this.stooqService.getStock(stockId);
  }
}
