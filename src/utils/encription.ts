import * as crypto from 'crypto';

// 生成盐
export function addSalt() {
  return crypto.randomBytes(3).toString('base64');
}

// 加密方法
export function encript(password: string, salt: string): string {
  return crypto
    .pbkdf2Sync(password, salt, 10000, 16, 'sha256')
    .toString('base64');
}
