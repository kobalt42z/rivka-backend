import { Controller, Get, Post, Body, Patch, Param, Delete ,UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

import { JwtGuard, RolesGuard } from '../auth/guards';
import { OnlyRole } from '../decorators';
import { Roles } from '../interfaces';
import { VALIDATION_CONFIG } from '../GlobalConst';

@UsePipes(new ValidationPipe(VALIDATION_CONFIG))
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }


  @UseGuards(JwtGuard, RolesGuard)
  @OnlyRole(Roles.ADMIN)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
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

  
@UseGuards(JwtGuard,RolesGuard)
@OnlyRole(Roles.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  
@UseGuards(JwtGuard,RolesGuard)
@OnlyRole(Roles.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
