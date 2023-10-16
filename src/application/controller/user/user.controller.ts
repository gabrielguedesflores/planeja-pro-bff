import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiHeaders, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../../../domain/service/user/user.service';
import { User, UserDocument } from '../../../infrastructure/schema/user/user.schema';

@ApiTags('/users')
@ApiBearerAuth()
@ApiHeaders([
  { name: 'Authorization', description: 'Bearer token do bff' }
])
@Controller('users/v1')
export class UsersController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Get(':id')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return user.' })
  async findOne(@Param('id') id: string): Promise<UserDocument> {
    return this.userService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiBody({ type: User })
  async create(@Body() user: UserDocument) {
    return this.userService.create(user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
  @ApiParam({ name: 'id', required: true, description: 'The id of the user' })
  @ApiBody({ type: User })
  async update(@Param('id') id: string, @Body() updatedUser: UserDocument) {
    return this.userService.update(id, updatedUser);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 204, description: 'The user has been successfully deleted.' })
  @ApiParam({ name: 'id', required: true, description: 'The id of the user' })
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }

}
