import { Controller, Post, Param, UploadedFile, UseInterceptors, UploadedFiles, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from 'domain/service/upload/upload.service';

@ApiTags('Upload de Imagens')
@ApiBearerAuth()
@Controller('upload/v1')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Post('/user/:userId')
  @ApiOperation({ summary: 'Upload User Image' })
  @ApiResponse({ status: 201, description: 'The upload has been successfully.', type: String })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async create(
    @Param('userId') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ imageUrl: string }> {
    return this.uploadService.create(userId, file);
  }

}
