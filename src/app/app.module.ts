import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HomeModule } from '../application/controller/home/home.module';
import { ExpenseModule } from '../application/controller/expense/expense.module';
import { UserModule } from '../application/controller/user/user.module';
import { TokenModule } from 'application/controller/token/token.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.URI_MONGODB),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
    HomeModule,
    ExpenseModule,
    UserModule,
    TokenModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
