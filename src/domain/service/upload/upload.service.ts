import { Injectable, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';

const writeFileAsync = util.promisify(fs.writeFile);

@Injectable()
export class UploadService {
  constructor() {}

  async create(id: string, fileImage: any): Promise<{ imageUrl: string }> {
    try {
      // Certifique-se de criar a pasta 'uploads' no diretório do seu aplicativo
      const uploadDirectory = path.join(__dirname, '../../../uploads');
      const fileName = `${id}`;
      const filePath = path.join(uploadDirectory, fileName);

      // Salva o arquivo na pasta 'uploads'
      await writeFileAsync(filePath, fileImage.buffer);

      // Agora, você pode salvar os detalhes do arquivo no banco de dados ou realizar outras operações necessárias

      // Retorne a URL para acessar o arquivo
      const imageUrl = `http://localhost:3000/uploads/${fileName}`; // Substitua pela URL real do seu servidor

      return { imageUrl };
    } catch (error) {
      console.error('Erro ao salvar o arquivo:', error);
      throw new BadRequestException('Erro ao processar o upload de arquivo.');
    }
  }
}
