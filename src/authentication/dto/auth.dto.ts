import { login } from '@app/user/dto/user.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class loginRequest extends login {}

export class recoveryRequest extends PartialType(loginRequest) {}

export class validateRecovery extends loginRequest {
  @IsString({ message: 'code is string' })
  @MinLength(16, { message: 'code min lenght is 16' })
  @MaxLength(60, { message: 'code max lenght is 60' })
  code: string;
}
