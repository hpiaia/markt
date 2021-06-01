import { Module } from '@nestjs/common';
import { ChatModule } from 'src/chat/chat.module';

import { CommandsController } from './commands.controller';
import { CommandsService } from './commands.service';

@Module({
  imports: [ChatModule],
  providers: [CommandsService],
  controllers: [CommandsController],
})
export class CommandsModule {}
