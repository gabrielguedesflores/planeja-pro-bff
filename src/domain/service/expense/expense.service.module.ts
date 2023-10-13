import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';

@Module({
    providers: [],
    exports: [ExpenseService],
})
export class ExpenseServiceModule {}
