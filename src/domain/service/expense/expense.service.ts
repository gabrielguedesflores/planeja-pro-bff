import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expense, ExpenseDocument } from '../../../infrastructure/schema/expense/expense.schema';
import { IExpenseDTO } from '../../../application/dto/Expense/expense.dto';

@Injectable()
export class ExpenseService {
	constructor(@InjectModel(Expense.name) private expenseModel: Model<ExpenseDocument>) { }

	async create(bodyRequest: ExpenseDocument): Promise<{ status: boolean }> {
		const createExpense = new this.expenseModel(bodyRequest);
		await createExpense.save();
		return { status: true };
	}

	async findAllByUserId(userId: string): Promise<ExpenseDocument[]> {
		return this.expenseModel.find({ userId: userId }).exec();
	}

	async update(id: string, updatedExpense: ExpenseDocument) {
		return this.expenseModel.findByIdAndUpdate(id, updatedExpense, { new: true });
	}

	async delete(id: string) {
		return this.expenseModel.findByIdAndDelete(id);
	}
}
