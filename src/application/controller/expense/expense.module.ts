import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from '../../../domain/service/expense/expense.service';
import { Expense, ExpenseSchema } from '../../../infrastructure/schema/expense/expense.schema';
import { AuthMiddleware } from 'src/middleware/auth.middleware';

@Module({
  imports: [MongooseModule.forFeature([{ name: Expense.name, schema: ExpenseSchema }])],
  controllers: [ExpenseController],
  providers: [ExpenseService],
})
export class ExpenseModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(ExpenseController);
  }
}
