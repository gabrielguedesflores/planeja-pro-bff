import { ApiProperty } from '@nestjs/swagger';

export class UploadDto {
  @ApiProperty({ type: () => Buffer, format: 'binary' })
  fileImage: Buffer;
}
