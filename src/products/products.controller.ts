import { Controller, Get, Post, Body, Patch, Param, Delete, ParseArrayPipe ,UseGuards} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateUserDto } from 'src/users-managment/dto/create-user.dto';
import { JoinCategoryDto } from './dto/join-category.dto';
import { OnlyRole } from 'src/decorators';
import { Roles } from 'src/interfaces';
import { JwtGuard, RolesGuard } from 'src/auth/guards';

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
  createAndConnect(@Body() createProductDto: CreateProductDto){
    return this.productsService.createAndConnect(createProductDto);
  }
  @Get()
  findAll() {
    return this.productsService.findAll();
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
