import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HomeModule } from '../application/controller/home/home.module';
import { ExpenseModule } from '../application/controller/expense/expense.module';
import { UserModule } from '../application/controller/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.URI_MONGODB),
    HomeModule,
    ExpenseModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
