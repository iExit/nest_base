import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { HashPasswordMiddleware } from '../../middleware/hash-password.middleware';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guards/auth.guard';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(HashPasswordMiddleware).forRoutes('user/register');
  }
}
