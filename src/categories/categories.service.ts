import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AwsService } from 'src/aws/aws.service';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly aws: AwsService
  ) { }
  async create(file: Express.Multer.File, createCategoryDto: CreateCategoryDto) {
    try {
      const imgUrl:string = await this.aws.uploadToS3(file, 'categories')
      const category = await this.prisma.category.create({ data: {...createCategoryDto,imgUrl} });
      return { action_status: "category created successfully !", category };
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const categories = await this.prisma.category.findMany({
        include:{products:true}
      });
      return { categories }
    } catch (error) {
      throw error
    }
  }

  async findOne(_id: string) {
    try {
      const category = await this.prisma.category.findUniqueOrThrow({ where: { id: _id },include:{products:{include:{_count:true}}} });
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
      const imgUrl = new URL(deleted.imgUrl);
      const res =  await this.aws.DeletFromS3(imgUrl.pathname.substring(1))
      return { action_status: `${_id} deleted successfully`, deleted };
    } catch (error) {
      throw error;
    }
  }
  async getSlist() {
    try {
      const slists = await this.prisma.category.findMany({ select: { id: true, name: true } });
      return slists;
    } catch (error) {
      throw error;
    }
  }
}
