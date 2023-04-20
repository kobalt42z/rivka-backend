import { Module, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CategoriesService } from '../categories/categories.service';
import { AwsService } from '../aws/aws.service';
import { APP_PIPE } from '@nestjs/core';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService,CategoriesService,AwsService]
})
export class ProductsModule {}
