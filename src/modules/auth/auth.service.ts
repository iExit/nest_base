import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IResponse } from 'src/interface/response.interface';
import { User } from 'src/interface/user.interface';
import { UserService } from 'src/modules/user/user.service';
import { encript } from 'src/utils/encription';

const logger = new Logger('auth.service.ts');

@Injectable()
export class AuthService {
  private res: IResponse;
  constructor(
    @InjectModel('USER_MODEL') private readonly userModel: Model<User>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * 用户登录
   */
  public async login(user: User) {
    try {
      const result: IResponse = await this.validateUser(user);
      if (result.code !== 0) {
        this.res = result;
        throw this.res;
      }
      this.res = {
        code: 0,
        msg: {
          token: await this.createToken(user),
          userId: result.msg.userId,
        },
      };
      return this.res;
    } catch (error) {
      logger.error(error);
      return this.res;
    }
  }

  /**
   * 用户注册
   */
  public async register(user: User) {
    try {
      const result = await this.userService.findOneByPhone(user.phone);
      if (result) {
        this.res = { code: 1, msg: '已注册' };
        throw this.res;
      }
      try {
        const createUser = new this.userModel(user);
        await createUser.save();
        this.res = { code: 0, msg: '注册成功' };
        this.res;
      } catch (error) {
        this.res = { code: 2, msg: '注册失败，错误详情:' + error };
        throw this.res;
      }
    } catch (error) {
      logger.error(error);
      return this.res;
    }
  }

  /**
   * 用户验证
   */
  private async validateUser(user: User) {
    try {
      const { phone, password } = user;
      const result: User = await this.userService.findOneByPhone(phone);
      if (!result) {
        this.res = { code: 3, msg: '用户未注册' };
        throw this.res;
      }
      const pass = encript(password, result.salt);
      if (pass === result.password) {
        this.res = { code: 0, msg: { userId: result._id } };
        return this.res;
      } else {
        this.res = { code: 4, msg: '用户名密码错误' };
        throw this.res;
      }
    } catch (error) {
      return error;
    }
  }

  /**
   * 创建token
   */
  private async createToken(user: User) {
    return await this.jwtService.sign(user);
  }
}
