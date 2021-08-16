import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Role } from 'src/decorator/role.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/interface/user.interface';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('用户模块')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  @ApiOperation({
    summary: '注册',
  })
  async register(@Body() userDto: User) {
    return this.userService.register(userDto);
  }

  @Get('hello')
  @Role('admin')
  async hello() {
    return 'hello';
  }
}
