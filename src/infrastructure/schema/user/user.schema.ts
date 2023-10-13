import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true })
    @ApiProperty()
    userName: string;

    @Prop({ required: true })
    @ApiProperty()
    userPassword: string;

    @Prop({ required: true })
    @ApiProperty()
    userEmail: string;

    @Prop()
    @ApiProperty()
    role: string;

    @Prop()
    @ApiProperty()
    profileImage: string;

    @Prop()
    @ApiProperty()
    coverImage: string;

    @Prop()
    @ApiProperty()
    userDateLastUpdated: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
