import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { UserModule } from './modules/user/user.module';
import { Log4jsModule } from '@nestx-log4js/core';
import { AuthModule } from './modules/auth/auth.module';
import { RedisModule, RedisModuleOptions } from 'nestjs-redis';
import { ProjectModule } from './modules/project/project.module';

const options: RedisModuleOptions = {
  name: 'nest_base',
  host: '127.0.0.1',
  port: 6379,
};

@Module({
  imports: [
    DbModule,
    UserModule,
    Log4jsModule.forRoot(),
    AuthModule,
    RedisModule.register(options),
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
