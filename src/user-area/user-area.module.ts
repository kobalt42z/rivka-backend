import { Module } from '@nestjs/common';
import { UserAreaService } from './user-area.service';
import { UserAreaController } from './user-area.controller';

@Module({
  providers: [UserAreaService],
  controllers: [UserAreaController]
})
export class UserAreaModule {}
