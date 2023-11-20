import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from '../../../domain/service/upload/upload.service';
import { AuthMiddleware } from '../../../middleware/auth.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(UploadController);
  }
}
