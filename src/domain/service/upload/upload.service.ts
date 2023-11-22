import { Injectable, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import * as mimeTypes from 'mime-types';

const writeFileAsync = util.promisify(fs.writeFile);
const sizeOf = require('image-size');

@Injectable()
export class UploadService {
  constructor() { }

  async create(id: string, file: Express.Multer.File): Promise<{ imageUrl: string }> {
    try {
      const uploadDirectory = path.join(__dirname, '../../../uploads');
      const fileExtension = this.getFileExtension(file.mimetype);
      const fileNameWithExtension = `${id}.${fileExtension}`;
      const filePathWithExtension = path.join(uploadDirectory, fileNameWithExtension);
      const filePath = path.join(uploadDirectory, id);

      // Remove todos os arquivos com o mesmo ID na pasta 'uploads' (independentemente da extensão)
      fs.readdirSync(uploadDirectory)
        .filter(file => file.startsWith(id))
        .forEach(file => fs.unlinkSync(path.join(uploadDirectory, file)));

      if (!this.isImage(file)) {
        throw new BadRequestException('O arquivo não é uma imagem válida.');
      }

      await writeFileAsync(fileNameWithExtension, file.buffer);

      // TODO: Atualizar a base de dados

      console.log('[UploadService] true');
      
      const imageUrl = `http://localhost:3000/uploads/${fileNameWithExtension}`; // Substitua pela URL real do seu servidor

      return { imageUrl };
    } catch (error) {
      console.error('Erro ao salvar o arquivo:', error);
      throw new BadRequestException('Erro ao processar o upload de arquivo.');
    }
  }

  private isImage(file: Express.Multer.File): boolean {
    try {
      const dimensions = sizeOf(file.buffer);
      return dimensions.width !== undefined && dimensions.height !== undefined;
    } catch (error) {
      return false;
    }
  }

  private getFileExtension(mimeType: string): string {
    const extension = mimeTypes.extension(mimeType);

    if (!extension) {
      throw new BadRequestException('Tipo de mídia não suportado.');
    }

    return extension;
  }
}
