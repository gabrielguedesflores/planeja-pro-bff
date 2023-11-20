import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UploadDocument = Upload & Document;

@Schema()
export class Upload {

  @Prop({ required: true })
  @ApiProperty({ type: File })
  fileImage: any

}

export const UploadSchema = SchemaFactory.createForClass(Upload);
