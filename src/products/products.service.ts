import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';


@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createProductDto: CreateProductDto) {
    try {
      const product = await this.prisma.product.create({
        data: { ...createProductDto }
      });

      return { msg: "product created succesfully!", product }
    } catch (error) {
      throw error
    }

  }
  async createOneOrMany(createProductDtoArray: CreateProductDto[]) {
    try {

      const products = await this.prisma.product.createMany({ data: createProductDtoArray });
      return { msg: "product created succesfully!", products }
    } catch (error) {
      throw error
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
      const slist = await this.prisma.product.findMany({select:{id:true,name:true}})
      return slist
    } catch (error) {
      throw error
    }
  }

  async findOne(_id: string) {
    try {
      const product = await this.prisma.product.findUniqueOrThrow({ where: { id: _id } });
      return product;
    } catch (error) {

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
