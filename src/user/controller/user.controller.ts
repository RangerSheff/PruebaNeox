import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { userFull, userUpdateRequest } from '../dto/user.dto';
import { AuthGuard } from '@app/authentication/guard/auth.guard';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly user: UserService) {}

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async findAllUser() {
    return await this.user.findAll();
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async findOne(@Request() req: any) {
    const { email } = req.email;
    return await this.user.findOne(email);
  }

  @Post()
  @UseGuards(AuthGuard)
  async createUser(@Body() userCreated: userFull) {
    return await this.user.create(userCreated);
  }

  @Put()
  @UseGuards(AuthGuard)
  async updateUser(@Request() req: any, @Body() userUpdated: userUpdateRequest) {
    const { email } = req.email;
    return await this.user.update(email, userUpdated, true);
  }

  @Delete()
  @UseGuards(AuthGuard)
  remove(@Request() req: any) {
    const { email } = req.email;
    return this.user.remove(email);
  }
}
