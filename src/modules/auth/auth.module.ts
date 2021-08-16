import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWT_CONSTANT } from './jwt.constant';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_CONSTANT.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy],
})
export class AuthModule {}
