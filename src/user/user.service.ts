import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/interface/user.interface';

@Injectable()
export class UserService {
  private res;
  constructor(
    @InjectModel('USER_MODEL') private readonly userModel: Model<User>,
  ) {}

  public async register(user: User) {
    const result = await this.userModel.findOne({
      phone: user.phone,
    });
    console.log(result);
    if (result) {
      this.res = '已注册';
      console.log(this.res);
      throw Error(this.res);
    }
    try {
      const createUser = new this.userModel(user);
      return createUser.save();
    } catch (error) {
      this.res = error;
      throw Error(error);
    }
  }
}
