import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.prisma.category.create({ data: createCategoryDto });
      return { action_status: "category created successfully !", category };
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const categorys = await this.prisma.category.findMany({});
      return { categorys }
    } catch (error) {
      throw error
    }
  }

  async findOne(_id: string) {
    try {
      const category = await this.prisma.category.findUniqueOrThrow({ where: { id: _id } });
      return category;
    } catch (error) {
      throw error
    }
  }
  async findeByName(categoryName: string) {
    try {
      const category = await this.prisma.category.findUniqueOrThrow({ where: { name: categoryName } });
      return category
    } catch (error) {
      throw error;
    }
  }

  async update(_id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const updated = await this.prisma.category.update({ where: { id: _id }, data: updateCategoryDto })
      return { action_status: "category updated successfully", updated };
    } catch (error) {
      throw error
    }
  }

  async remove(_id: string) {
    try {
      const deleted = await this.prisma.category.delete({ where: { id: _id } })
      return { action_status: `${_id} deleted successfully`, deleted };
    } catch (error) {
      throw error;
    }
  }
  async getSlist(){
    try {
      const slists = await this.prisma.category.findMany({select:{id:true,name:true}});
      return slists;
    } catch (error) {
      throw error;
    }
  }
}
