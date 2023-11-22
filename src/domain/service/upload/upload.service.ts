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
      const relativeUploadsPath = path.join('dist', 'uploads');
      const uploadDirectory = path.join(process.cwd(), relativeUploadsPath);

      if (!fs.existsSync(uploadDirectory)) {
        fs.mkdirSync(uploadDirectory, { recursive: true });
      }
      
      const fileExtension = this.getFileExtension(file.mimetype);
      const fileNameWithExtension = `${id}.${fileExtension}`;
      const filePathWithExtension = path.join(uploadDirectory, fileNameWithExtension);

      fs.readdirSync(uploadDirectory)
        .filter(file => file.startsWith(id))
        .forEach(file => fs.unlinkSync(path.join(uploadDirectory, file)));

      if (!this.isImage(file)) {
        throw new BadRequestException('O arquivo não é uma imagem válida.');
      }

      await writeFileAsync(filePathWithExtension, file.buffer);

      // TODO: Analisar se atualiza a base de dados aqui ou via front

      console.log('[UploadService] true');
      
      const imageUrl = `http://localhost:3000/uploads/${fileNameWithExtension}`;

      return { imageUrl };
    } catch (error) {
      console.error('Erro ao salvar o arquivo:', error);
      throw new BadRequestException('Erro ao processar o upload de arquivo.');
    }
  }

  async get(id: string): Promise<Express.Multer.File | any> {
    try {
      const relativeUploadsPath = path.join('dist', 'uploads');
      const uploadDirectory = path.join(process.cwd(), relativeUploadsPath);
  
      if (!fs.existsSync(uploadDirectory)) {
        fs.mkdirSync(uploadDirectory, { recursive: true });
      }
  
      const matchingFiles = fs
        .readdirSync(uploadDirectory)
        .filter((file) => file.startsWith(id));
  
      if (matchingFiles.length === 0) {
        throw new BadRequestException('Arquivo não encontrado.');
      }
  
      const fileName = matchingFiles[0];
      const filePath = path.join(uploadDirectory, fileName);
      const fileContent = fs.readFileSync(filePath);
  
      return fileContent;
    } catch (error) {
      console.error('Erro ao obter o arquivo:', error);
      throw new BadRequestException('Erro ao obter o arquivo.');
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
