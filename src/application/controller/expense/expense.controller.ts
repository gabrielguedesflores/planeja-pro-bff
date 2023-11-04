import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Req, Headers, Delete, Put, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiHeaders, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExpenseUser } from '../../../application/dto/Expense/expense-user.dto';
import { ExpenseService } from '../../../domain/service/expense/expense.service';
import { Expense, ExpenseDocument } from '../../../infrastructure/schema/expense/expense.schema';

@ApiTags('/expense')
@ApiBearerAuth()
@ApiHeaders([
  { name: 'Authorization', description: 'Bearer token do bff' }
])
@Controller('expense/v1')
export class ExpenseController {
  constructor(
    private readonly expenseService: ExpenseService,
  ) { }

  @Get('/user/:userId')
  @ApiOperation({ summary: 'Get all expenses for users' })
  @ApiResponse({ status: 200, description: 'Return all expenses.' })
  @ApiParam({ name: 'userId', required: true, description: 'User ID' })
  async findAllForUser(@Param('userId') userId: string) {
    return this.expenseService.findAllByUserId(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create an expenses' })
  @ApiResponse({ status: 201, description: 'The expense has been successfully created.' })
  @ApiBody({ type: Expense })
  async create(@Body() createResponseDto: ExpenseDocument): Promise<{ created: boolean }> {
    return this.expenseService.create(createResponseDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an expense' })
  @ApiResponse({ status: 200, description: 'The expense has been successfully updated.' })
  @ApiParam({ name: 'id', required: true, description: 'The id of the expense' })
  @ApiBody({ type: Expense })
  async update(@Param('id') id: string, @Body() updatedExpense: ExpenseDocument) {
    return this.expenseService.update(id, updatedExpense);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an expense' })
  @ApiResponse({ status: 200, description: 'The expense has been successfully deleted.' })
  @ApiParam({ name: 'id', required: true, description: 'The id of the expense' })
  async delete(@Param('id') id: string) {
    return this.expenseService.delete(id);
  }

}
