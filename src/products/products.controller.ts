import { Controller, Get, Post, Body, Patch, Param, Delete, ParseArrayPipe, UseGuards, Query, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UsePipes, UploadedFiles, ValidationPipe, ParseFloatPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateUserDto } from 'src/users-managment/dto/create-user.dto';
import { JoinCategoryDto } from './dto/join-category.dto';
import { OnlyRole } from 'src/decorators';
import { Roles } from 'src/interfaces';
import { JwtGuard, RolesGuard } from 'src/auth/guards';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ProductReqValidator } from './pipes/ProductData.pipe';
import { parseJsonPipe } from './pipes/ParseJson.pipe';
import { VALIDATION_CONFIG } from 'src/GlobalConst';

@UseGuards(JwtGuard, RolesGuard)
@OnlyRole(Roles.ADMIN)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }


  // @Post()
  // createOneOrMany(
  //   @Body(new ParseArrayPipe({items:CreateProductDto})) 
  //   createProductDtos: CreateProductDto[]) {
  //   return this.productsService.createOneOrMany(createProductDtos);
  // }

  // new ProductReqValidator({
  //   maxImageSize: 1 * 1000 * 1000,
  //   allowedImageTypes: ['image/png', 'image/jpeg']
  // })

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    // { name: 'product_description', maxCount: 1 }
  ]))
  createAndConnect(
    @UploadedFiles(new ProductReqValidator({
      allowedImageTypes: ['image/png', 'image/jpeg'],
      maxImageSize: 16 * 1000 * 1000
    }))
    file: Express.Multer.File,
    @Body(new parseJsonPipe(), new ValidationPipe(VALIDATION_CONFIG)) body: CreateProductDto) {
      console.log({ body, file });
    return this.productsService.createAndConnect(body, file);
    
    // return { body, file }

  }

  @Get()
  findAll(@Query('page') page: number) {
    return this.productsService.findAll(page);
  }
  @Get('slist')
  getSlist() {
    return this.productsService.getSlist();
  }

  @Get('byCategory/:categoryId')
  findAllInCategory(@Param('categoryId') categoryId: string) {

    return this.productsService.findAllInCategory(categoryId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
