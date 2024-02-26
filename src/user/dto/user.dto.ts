import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEmail, IsInt, IsString, MaxLength, MinLength } from 'class-validator';

export class email {
  @IsString({ message: 'email is string' })
  @IsEmail()
  @MinLength(10, { message: 'email min lenght is 10' })
  @MaxLength(100, { message: 'email max lenght is 100' })
  email: string;
}

export class login extends email {
  @IsString({ message: 'password is string' })
  @MinLength(4, { message: 'password min lenght is 4' })
  @MaxLength(100, { message: 'password max lenght is 100' })
  password: string;
}

export class userRequest extends login {
  @Transform(({ value }) => value.trim())
  @IsString({ message: 'username is string' })
  @MinLength(4, { message: 'username min lenght is 4' })
  @MaxLength(40, { message: 'username max lenght is 40' })
  username: string;

  @IsString({ message: 'names is string' })
  @MinLength(10, { message: 'names min lenght is 10' })
  @MaxLength(100, { message: 'names max lenght is 100' })
  names: string;

  @IsString({ message: 'lastName is string' })
  @MinLength(10, { message: 'lastName min lenght is 10' })
  @MaxLength(100, { message: 'lastName max lenght is 100' })
  lastName: string;

  @IsBoolean({ message: 'active is boolean' })
  active?: boolean;
}

export class userFull extends userRequest {}

export class userOneRequest extends email {}

export class userDeleteRequest extends email {}

export class userUpdateRequest extends PartialType(userFull) {}
