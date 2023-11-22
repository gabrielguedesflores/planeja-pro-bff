import { Controller, Post, Get, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
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

  @Get('/user/:userId')
  @ApiOperation({ summary: 'Obter Imagem do Usuário' })
  @ApiResponse({
    status: 200,
    description: 'A solicitação foi concluída com sucesso.',
    type: 'Express.Multer.File',
  })
  async get(@Param('userId') userId: string): Promise<Express.Multer.File | any> {
    return this.uploadService.get(userId);
  }
}
