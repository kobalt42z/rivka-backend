import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { AwsModule } from '../aws/aws.module';


@Module({
  imports:[AuthModule,AwsModule],
  controllers: [UsersController],
  providers: [UsersService,AuthService,JwtService]
})
export class UsersModule {}
// 