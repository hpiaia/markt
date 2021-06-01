import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'name should not be empty' })
  name: string;

  @IsEmail({}, { message: 'email address is not valid' })
  email: string;

  @IsNotEmpty({
    message: 'password should not be empty',
  })
  password: string;

  @IsNotEmpty({
    message: 'password confirmation should not be empty',
  })
  passwordConfirmation: string;
}
