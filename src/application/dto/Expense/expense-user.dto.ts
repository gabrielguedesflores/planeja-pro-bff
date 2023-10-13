import { ApiProperty } from "@nestjs/swagger";

export class ExpenseUser {
    @ApiProperty()
    userId: string;
}