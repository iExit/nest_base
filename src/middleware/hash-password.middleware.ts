import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { addSalt, encript } from '../utils/encription';

/**
 * 密码加密中间件
 */
@Injectable()
export class HashPasswordMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let password = req.body['password'];
    if (password) {
      const salt = addSalt();
      password = encript(password, salt);
      req.body['password'] = password;
      req.body['salt'] = salt;
    }
    console.log('加密后的密码：' + req.body['password']);
    next();
  }
}
