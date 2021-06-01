import { HttpService, Injectable } from '@nestjs/common';
import { parse } from 'papaparse';

interface StooqResponse {
  Symbol: string;
  Date: string;
  Time: string;
  Open: string;
  High: string;
  Low: string;
  Close: string;
  Volume: string;
}

@Injectable()
export class StooqService {
  constructor(private readonly httpService: HttpService) {}

  async getStock(id: string) {
    if (!id) return 'Usage: /stock [stockId]';

    const { data } = await this.httpService
      .get(`https://stooq.com/q/l/?s=${id}&f=sd2t2ohlcv&h&e=csv`)
      .toPromise();

    const result = parse<StooqResponse>(data, {
      header: true,
      skipEmptyLines: true,
    }).data[0];

    return result.Close === 'N/D'
      ? 'No quotes found for this stock code'
      : `${id.toUpperCase()} quote is $${result.Close} per share`;
  }
}
