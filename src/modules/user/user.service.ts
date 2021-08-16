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


  public async findOneByPhone(phone: string) {
    return await this.userModel.findOne({
      phone,
    });
  }
}
