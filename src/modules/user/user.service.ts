import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IResponse } from 'src/interface/response.interface';
import { User } from 'src/interface/user.interface';

const logger = new Logger('user.service.ts');
@Injectable()
export class UserService {
  private res: IResponse;
  constructor(
    @InjectModel('USER_MODEL') private readonly userModel: Model<User>,
  ) {}

  public async register(user: User) {
    try {
      const result = await this.findOneByPhone(user.phone);
      if (result) {
        this.res = { code: 1, msg: '已注册' };
        throw this.res;
      }
      try {
        const createUser = new this.userModel(user);
        await createUser.save();
        this.res = { code: 0, msg: '注册成功' };
        return this.res;
      } catch (error) {
        this.res = { code: 2, msg: '注册失败，错误详情:' + error };
        throw this.res;
      }
    } catch (error) {
      logger.error(error);
      return this.res;
    }
  }

  private async findOneByPhone(phone: string) {
    return await this.userModel.findOne({
      phone,
    });
  }
}
