import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../../infrastructure/schema/user/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

	async create(user: UserDocument): Promise<any> {
		user.userPassword = await bcrypt.hash(user.userPassword, 10);

		const createdUser = new this.userModel(user);
		return await createdUser.save();
	}

	async findAll(): Promise<UserDocument[]> {
		return this.userModel.find().exec();
	}

	async findOne(id: string): Promise<UserDocument | null> {
		return this.userModel.findById(id).exec();
	}

	async update(id: string, updatedUser: UserDocument) {
		return this.userModel.findByIdAndUpdate(id, updatedUser, { new: true });
	}

	async delete(id: string) {
		return this.userModel.findByIdAndDelete(id);
	}

	async validateUser(userEmail: string, userPassword: string): Promise<UserDocument | null> {
		const user = await this.userModel.findOne({ userEmail }).exec();
		if (user && await bcrypt.compare(userPassword, user.userPassword)) {
			return user;
		}
		return null;
	}
}
