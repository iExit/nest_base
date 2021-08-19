import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { HashPasswordMiddleware } from '../../middleware/hash-password.middleware';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
