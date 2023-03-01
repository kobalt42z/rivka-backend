import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { CategoriesService } from 'src/categories/categories.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JoinCategoryDto } from './dto/join-category.dto';
import { UpdateProductDto } from './dto/update-product.dto';


@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly categoriesService: CategoriesService
  ) { }

  async createAndConnect(createProductDto: CreateProductDto) {
    try {
      const categories = createProductDto.categoryIds.map((id) => ({ id }))
      const product = await this.prisma.product.create({
        data: {
          ...createProductDto,
          categorys: { connect: categories }
        }

      });

      return { msg: "product created succesfully!", product }
    } catch (error) {
      throw error
    }

  }

  // !cannot create multiple link to categories , category must be updated with method joinCategoryByName
  async createOneOrMany(createProductDtoArray: CreateProductDto[]) {
    try {

      const products = await this.prisma.product.createMany({ data: createProductDtoArray });
      return { msg: "product created succesfully!", products }
    } catch (error) {
      throw error
    }
  }

  /*
    * this function recive product_id and an array of category ids
    * the function will map the ids provided and transform them into an array of objects that
    * contains id 
    * next the function will call prisma update to connect the product to categories using connect to relational field categoriy  
  */
  async connectToCategories(product_id: string, JoinCategoryIdDto: JoinCategoryDto) {
    console.log(JoinCategoryDto);

    try {
      const categories = JoinCategoryIdDto.categoryIds.map((id) => ({ id }))
      const updatedCategory = await this.prisma.product.update({ where: { id: product_id }, data: { categorys: { connect: categories } } })
      return { action_status: "category linked sucessfuly !", updatedCategory }
    } catch (error) {
      throw error;
    }

  }

  async findAllInCategory(categoryId: string) {
    try {
      if (!categoryId) throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST)
      const itemsInCategory = await this.prisma.category.findUniqueOrThrow({ where: { id: categoryId }, include: { products: true } })
      return itemsInCategory;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const products = await this.prisma.product.findMany({});
      return products;
    } catch (error) {
      throw error
    }
  }
  async getSlist() {
    try {
      const slist = await this.prisma.product.findMany({ select: { id: true, name: true } })
      return slist
    } catch (error) {
      throw error
    }
  }

  async findOne(_id: string) {
    try {
      const product = await this.prisma.product.findUniqueOrThrow({ where: { id: _id }, include: { categorys: true } });
      return product;
    } catch (error) {
      throw error ;
    }
  }

  async update(_id: string, updateProductDto: UpdateProductDto) {
    try {
      const updatedProduct = await this.prisma.product.update({
        where: { id: _id },
        data: updateProductDto
      });
      return { action_status: "updated successfully !", updatedProduct };
    } catch (error) {
      throw error;
    }
  }

  async remove(_id: string) {
    try {
      const remove = await this.prisma.product.delete({ where: { id: _id } });
      return { action_status: `sucessfuly deleted :${_id}`, remove };
    } catch (error) {
      throw error;
    }
  }

}
