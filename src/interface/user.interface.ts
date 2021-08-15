import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  @ApiProperty({
    description: '手机号',
    example: '15726904063',
  })
  readonly phone: string;

  @Prop()
  @ApiProperty({
    description: '密码',
    example: '123456',
  })
  readonly password: string;
}
