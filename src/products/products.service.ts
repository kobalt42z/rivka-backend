import { Injectable, UploadedFile } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { CategoriesService } from '../categories/categories.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, SpecificationsDto } from './dto/create-product.dto';
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

  async createAndConnect({ categoryIds, translations, Specifications, ...rest }: CreateProductDto, file: Express.Multer.File) {
    try {
      const imgURL = await this.aws.uploadToS3(file, 'products')
      const categories = categoryIds.map((id) => ({ id }));


      const product = await this.prisma.product.create({
        data: {
          ...rest, imgUrl: imgURL,
          categorys: {
            connect: categories
          },
          translations: {
            create: translations
          },
          Specification: {
            createMany: {
              data: Specifications
            }
          }
        }
      });

      return { msg: "product created succesfully!", product }
    } catch (error) {
      throw error
    }

  }


  // ?for shop 
  // test if we get the basic product in addition to spec 
  async findAllInCategory(categoryName: string) {
    try {
      const itemsInCategory = await this.prisma.category.findUniqueOrThrow({
        where: {
          name: categoryName
        },
        include: {
          products: {
            include: {
              Specification: true
            }
          },
          _count: {
            select: {
              products: true
            }
          }
        }
      })
      return itemsInCategory;
    } catch (error) {
      throw error;
    }
  }


  // test if we get the basic product in addition to spec 
  async findAllWithProducts(skipProducts: number, skipCategories: number) {
    try {

      const categoryAndItems = await this.prisma.category.findMany({
        include: {
          products: {
            include: { Specification: true },
          },
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
          categorys: { select: { name: true }, },
          Specification: true,
        }

      });
      const count = await this.prisma.product.count();
      return { products, count };
    } catch (error) {
      throw error
    }
  }

  async findOne(_id: string, comment?: number) {
    const perPage = 10;
    try {
      const product = await this.prisma.product.findUniqueOrThrow({
        where: { id: _id }, include: {
          _count: { select: { Comment: true, WishList: true } },
          translations: true,
          Comment: {
            take: perPage,
            skip: perPage * (comment ?? 0),
            include: {
              user: {
                select: {

                  fullName: true, imgUrl: true,
                }
              }
            }
          },
          Specification: true,
          categorys: {
            select: {
              name: true, products: {
                take: 10
              }
            }
          }

        }
      });
      return product;
    } catch (error) {
      throw error;
    }
  }

  async findByspec(spec: SpecificationsDto) {
    try {
      const products = await this.prisma.product.findMany(
        {
          include: {
            Specification: {
              where: spec
            }
          }
        }
      )
      return products
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

  async update(_id: string, updateProductDto: UpdateProductDto, file?: Express.Multer.File) {
    try {
      let categories: { id: string }[] | never;
      if (updateProductDto.categoryIds) {
        categories = updateProductDto.categoryIds.map((id) => ({ id }));
      }
      // const transArr = [
      //   updateProductDto?.translations?.fr,
      //   updateProductDto?.translations?.en,
      // ]

      const updatedProduct = await this.prisma.product.update({
        where: { id: _id }, //TODO ToCheck
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
