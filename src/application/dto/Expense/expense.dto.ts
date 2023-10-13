export interface IExpenseDTO {
  expenseId: string,
  userId: string,
  description: string,
  amount: number,
  date: Date,
  tags: [string]
}