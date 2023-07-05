import { Controller, Get, Post, Body, Patch, Param, Delete, ParseArrayPipe, UseGuards, Query, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UploadedFiles, ValidationPipe, ParseFloatPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateUserDto } from '../users-managment/dto/create-user.dto';
import { JoinCategoryDto } from './dto/join-category.dto';
import { OnlyRole } from '../decorators';
import { Roles } from '../interfaces';
import { JwtGuard, RolesGuard } from '../Auth/guards';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ImgAndJsonValidator } from './pipes/ProductData.pipe';
import { parseJsonPipe } from './pipes/ParseJson.pipe';
import { VALIDATION_CONFIG } from '../GlobalConst';
import { FormBody } from 'src/decorators/formBody.decorator';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }
  //!!!!!!
  // @OnlyRole(Roles.ADMIN)
  // @UseGuards(JwtGuard, RolesGuard)
  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    // { name: 'product_description', maxCount: 1 }
  ]))
  createAndConnect(
    @UploadedFiles(new ImgAndJsonValidator({
      allowedImageTypes: ['image/png', 'image/jpg', 'image/jpeg'],
      maxImageSize: 16 * 1000 * 1000 * 1000
    }))
    file: Express.Multer.File,
    @FormBody() body: CreateProductDto) {
    console.log({ body, file });
    return this.productsService.createAndConnect(body, file);
  }

  @Get()
  findAll(@Query('page') page: number) {
    return this.productsService.findAll(page);
  }

  @Get('slist')
  getSlist() {
    return this.productsService.getSlist();
  }

  @Get('shopCount')
  getShopCount() {
    return this.productsService.getShopCount();
  }

  @Get('byCategory/')
  findAllWithProducts(@Query('page') pages: number, @Query('category') categoryTarget: number) {

    return this.productsService.findAllWithProducts(pages, categoryTarget);
  }

  @Get('byCategory/:categoryId')
  findAllInCategory(@Param('categoryId') categoryId: string) {
    return this.productsService.findAllInCategory(categoryId);
  }


  @Get(':id')
  findOne(@Param('id') id: string , @Query('comment') comment: number) {
    
    return this.productsService.findOne(id,comment);
  }


  @UseGuards(JwtGuard, RolesGuard)
  @OnlyRole(Roles.ADMIN)
  @Patch(':id')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    // { name: 'product_description', maxCount: 1 }
  ]))
  update(@Param('id') id: string, @UploadedFiles(
    new ImgAndJsonValidator({
      allowedImageTypes: ['image/png', 'image/jpg'],
      maxImageSize: 16 * 1000 * 1000,
      imageOptional: true
    })
  ) file: Express.Multer.File, @Body(new parseJsonPipe(), new ValidationPipe(VALIDATION_CONFIG)) updateProductDto: UpdateProductDto) {
    id = id.replace('', '')
    return this.productsService.update(id, updateProductDto, file);
    // return { id, updateProductDto ,file}  
  }
  // @UseGuards(JwtGuard, RolesGuard)
  // @OnlyRole(Roles.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
