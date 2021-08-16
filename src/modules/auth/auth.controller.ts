import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/interface/user.interface';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('用户验证模块')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: '登录',
  })
  public async login(@Body() userDto: User) {
    return await this.authService.login(userDto);
  }

  @Post('register')
  @ApiOperation({
    summary: '注册',
  })
  async register(@Body() userDto: User) {
    return this.authService.register(userDto);
  }
}
