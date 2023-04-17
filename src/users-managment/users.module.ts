import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { AwsModule } from 'src/aws/aws.module';


@Module({
  imports:[AuthModule,AwsModule],
  controllers: [UsersController],
  providers: [UsersService,AuthService,JwtService]
})
export class UsersModule {}
// 