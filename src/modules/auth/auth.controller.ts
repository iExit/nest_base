import { Body, Controller, Post, Get, Param } from '@nestjs/common';
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

  @Post('alter')
  @ApiOperation({
    summary: '修改',
  })
  async alter(@Body() userDto: User) {
    return this.authService.alter(userDto);
  }

  @Get('captcha/:id')
  @ApiOperation({
    summary: '获取注册验证码',
  })
  async createCaptcha(@Param('id') id: string) {
    return this.authService.createCaptcha(id);
  }

  @Post('verify')
  @ApiOperation({
    summary: '验证注册验证码',
  })
  async verify(@Body() captcha: { captcha: string; id: string }) {
    return this.authService.verification(captcha.captcha, captcha.id);
  }
}
