import { IsNotEmpty } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty({ message: 'name should not be empty' })
  name: string;

  @IsNotEmpty({
    message: 'description should not be empty',
  })
  description: string;
}
