import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UploadDocument = Upload & Document;

@Schema()
export class Upload {

  @ApiProperty({type:"file"})
  file: any;

}

export const UploadSchema = SchemaFactory.createForClass(Upload);
