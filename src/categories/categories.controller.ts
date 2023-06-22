import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

import { JwtGuard, RolesGuard } from '../Auth/guards';
import { OnlyRole } from '../decorators';
import { Roles } from '../interfaces';
import { VALIDATION_CONFIG } from '../GlobalConst';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ImgAndJsonValidator } from 'src/products/pipes/ProductData.pipe';
import { parseJsonPipe } from 'src/products/pipes/ParseJson.pipe';
import { FormBody } from 'src/decorators/formBody.decorator';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }


  // @UseGuards(JwtGuard, RolesGuard)
  // @OnlyRole(Roles.ADMIN)
  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 }
  ]))
  create(@UploadedFiles(new ImgAndJsonValidator({
    allowedImageTypes:['image/jpg', 'image/jpeg','image/png'],
    maxImageSize:16*1000*1000
  })) file:Express.Multer.File ,
   @FormBody() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(file,createCategoryDto);
    
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get('slist')
  getSlist() {
    return this.categoriesService.getSlist();
  }


  @Get('byName/:CatName')
  findeByName(@Param('CatName') catName: string) {
    return this.categoriesService.findeByName(catName);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }


  @UseGuards(JwtGuard, RolesGuard)
  @OnlyRole(Roles.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }


  @UseGuards(JwtGuard, RolesGuard)
  @OnlyRole(Roles.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
