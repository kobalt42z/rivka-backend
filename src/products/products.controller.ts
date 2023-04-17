import { Controller, Get, Post, Body, Patch, Param, Delete, ParseArrayPipe ,UseGuards, Query, UseInterceptors,UploadedFile,ParseFilePipe,MaxFileSizeValidator, FileTypeValidator} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateUserDto } from 'src/users-managment/dto/create-user.dto';
import { JoinCategoryDto } from './dto/join-category.dto';
import { OnlyRole } from 'src/decorators';
import { Roles } from 'src/interfaces';
import { JwtGuard, RolesGuard } from 'src/auth/guards';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(JwtGuard, RolesGuard)
@OnlyRole(Roles.ADMIN)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}


  // @Post()
  // createOneOrMany(
  //   @Body(new ParseArrayPipe({items:CreateProductDto})) 
  //   createProductDtos: CreateProductDto[]) {
  //   return this.productsService.createOneOrMany(createProductDtos);
  // }


  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createAndConnect(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile(
      new ParseFilePipe({
        validators:[
          // Checks if a given file's size is less than the provided value (measured in bytes)
          new MaxFileSizeValidator({maxSize:16*1000*1000}),
          new FileTypeValidator({fileType:"image/*"})
        ]
      })
    ) file:Express.Multer.File
  ){
    return this.productsService.createAndConnect(createProductDto);
  }
  @Get()
  findAll(@Query('page') page:number ) {
    return this.productsService.findAll(page);
  }
  @Get('slist')
  getSlist() {
    return this.productsService.getSlist();
  }

  @Get('byCategory/:categoryId')
  findAllInCategory(@Param('categoryId') categoryId:string) {
    
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
