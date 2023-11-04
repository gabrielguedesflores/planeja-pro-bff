import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type ExpenseDocument = Expense & Document;

@Schema()
export class Expense {

  @Prop()
  @ApiProperty()
  id: string;

  @Prop({ required: true })
  @ApiProperty()
  userId: string;

  @Prop({ required: true })
  @ApiProperty()
  description: string;

  @Prop({ required: true })
  @ApiProperty()
  amount: number;

  @Prop()
  @ApiProperty()
  date: Date;

  @Prop()
  @ApiProperty()
  tags: [string];

  @Prop()
  @ApiProperty()
  recurrence: boolean;

}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
