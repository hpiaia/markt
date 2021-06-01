import { Injectable } from '@nestjs/common';

@Injectable()
export class CommandsService {
  sum(...args: string[]): string {
    const total = (args.map(Number) || []).reduce((a, b) => a + b);

    return `Your sum is: ${total}`;
  }
}
