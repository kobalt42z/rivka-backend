import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt/dist';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategieProvider } from './strategies';
import { AwsService } from '../aws/aws.service';
import { AwsModule } from '../aws/aws.module';

@Module({
  imports:[JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategieProvider,AwsService],
  // exports:[AuthService]
})
export class AuthModule {}
