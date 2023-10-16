import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type LoginDocument = Login & Document;

@Schema()
export class Login {
  @Prop({ required: true })
  @ApiProperty()
  userEmail: string;

  @Prop({ required: true })
  @ApiProperty()
  userPassword: string;
}

export const LoginSchema = SchemaFactory.createForClass(Login);
