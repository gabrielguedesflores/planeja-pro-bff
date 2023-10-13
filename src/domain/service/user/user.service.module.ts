import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
    providers: [],
    exports: [UserService],
})
export class UserServiceModule {}
