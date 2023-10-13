import { ApiProperty } from "@nestjs/swagger";

export class ExpenseRequest {
    @ApiProperty()
    expenseId: string;

    @ApiProperty()
    userId: string;
    
    @ApiProperty()
    description: string;
    
    @ApiProperty()
    amount: number;
    
    @ApiProperty()
    date: Date;
    
    @ApiProperty()
    tags: [string]
}