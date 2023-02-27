import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports:[AuthModule],
  controllers: [UsersController],
  providers: [UsersService,AuthService,JwtService]
})
export class UsersModule {}
// 