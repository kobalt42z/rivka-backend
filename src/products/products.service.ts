import { Injectable, UploadedFile } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { CategoriesService } from '../categories/categories.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JoinCategoryDto } from './dto/join-category.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { TranslationDto } from './dto/create-product.dto'
import { create } from 'domain';
import { AwsService } from '../aws/aws.service';
import { PutObjectAclCommandOutput, PutObjectCommandOutput } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly categoriesService: CategoriesService,
    private readonly aws: AwsService,
    private readonly config: ConfigService
  ) { }

  async createAndConnect(createProductDto: CreateProductDto, file: Express.Multer.File) {
    try {
      const imgURL = await this.aws.uploadToS3(file, 'products')



      const categories = createProductDto.categoryIds.map((id) => ({ id }));

      const translatArr = [
        {
          ...createProductDto.translations.fr
        },
        {
          ...createProductDto.translations.en
        },
      ];

      const product = await this.prisma.product.create({
        data: {
          ...createProductDto, imgUrl: imgURL,
          categorys: {
            connect: categories
          },
          translations: {
            create: translatArr
          }
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
      const itemsInCategory = await this.prisma.category.findUniqueOrThrow({ where: { id: categoryId }, include: { products: true, _count: { select: { products: true } } } })


      return itemsInCategory;
    } catch (error) {
      throw error;
    }
  }

  async findAllWithProducts(skipProducts: number, skipCategories: number) {
    try {

      const categoryAndItems = await this.prisma.category.findMany({
        include: {
          products: true,
        },
        take: 1,
        skip: skipCategories * 1 || 0,
      })


      return { categoryAndItems };
    } catch (error) {
      throw error;
    }
  }

  async getShopCount() {
    try {
      const categoryCount = await this.prisma.category.count()
      return categoryCount
    } catch (error) {
      throw error
    }
  }

  async findAll(_skip: number) {
    try {
      const products = await this.prisma.product.findMany({
        take: 10,
        skip: _skip * 10 || 0,
        include: {
          translations: true,
          categorys: { select: { name: true } }
        }

      });
      const count = await this.prisma.product.count();
      return { products, count };
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
      throw error;
    }
  }

  async update(_id: string, updateProductDto: UpdateProductDto, file?: Express.Multer.File) {
    try {
      let categories: { id: string }[] | never;
      if (updateProductDto.categoryIds) {
        categories = updateProductDto.categoryIds.map((id) => ({ id }));
      }
      const transArr = [
        updateProductDto?.translations?.fr,
        updateProductDto?.translations?.en,
      ]
      console.log(transArr);
      console.log(_id, typeof _id);
      const updatedProduct = await this.prisma.product.update({
        where: { id: "6449298d9f15569fcfb1df4a" }, //!tofix
        data: {
          ...updateProductDto,
          translations: {
            updateMany: {
              where: {},
              data: { ...updateProductDto.translations }
            }
          },

          categorys: {
            connect: categories
          }
        }
      });
      return { action_status: "updated successfully !", updatedProduct };
    } catch (error) {
      throw error;
    }
  }

  async remove(_id: string) {
    try {
      const relatedCategory = await this.prisma.product.update({ where: { id: _id }, data: { categorys: { set: [] } } })
      const ToDelete = await this.prisma.product.delete({ where: { id: _id } });
      const ImgUrl = new URL(ToDelete.imgUrl)

      // console.log(ImgUrl.pathname.substring(1));

      const res = await this.aws.DeletFromS3(ImgUrl.pathname.substring(1));
      //  console.log(res);

      return { action_status: `sucessfuly deleted :${_id}`, ToDelete };
    } catch (error) {
      throw error;
    }
  }

}
