import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RedisService } from 'nestjs-redis';
import { IResponse } from 'src/interface/response.interface';
import { User } from 'src/interface/user.interface';
import * as Redis from 'ioredis';

const logger = new Logger('user.service.ts');

@Injectable()
export class UserService {
  private res: IResponse;
  private redis: Redis.Redis;
  constructor(
    @InjectModel('USER_MODEL') private readonly userModel: Model<User>,
    private readonly redisService: RedisService,
  ) {
    this.redis = this.redisService.getClient('nest_base');
  }

  public async findOneByPhone(phone: string) {
    return await this.userModel.findOne({
      phone,
    });
  }

  public async hello() {
    return await this.redis.set('nest_base', 'hellow world');
  }
}
