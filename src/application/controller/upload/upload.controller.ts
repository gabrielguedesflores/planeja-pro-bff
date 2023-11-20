import { Controller, Post, Param, UploadedFile, UseInterceptors, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from 'domain/service/upload/upload.service';
import { UploadDto } from 'application/dto/Upload/index.dto';

@ApiTags('Upload Profile Image')
@ApiBearerAuth()
@Controller('upload/v1')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/user/:userId')
  @ApiOperation({ summary: 'Upload User Image' })
  @ApiResponse({ status: 201, description: 'The upload has been successfully.' })
  // @ApiBody({ type: UploadDto })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        comment: { type: 'string' },
        outletId: { type: 'integer' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file, @Param('userId') userId: string): Promise<{ imageUrl: string }> {
    return this.uploadService.create(file, userId);
  }
}
