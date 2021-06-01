import { IsNotEmpty } from 'class-validator';

export class SendMessageDto {
  @IsNotEmpty({ message: 'text should not be empty' })
  text: string;
}
