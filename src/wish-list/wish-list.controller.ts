import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WishListService } from './wish-list.service';
import { CreateWishListDto } from './dto/create-wish-list.dto';
import { UpdateWishListDto } from './dto/update-wish-list.dto';
import { JwtGuard, RolesGuard } from 'src/Auth/guards';
import { GetPayload, OnlyRole } from 'src/decorators';
import { Roles, userTokenPayload } from 'src/interfaces';

@UseGuards(JwtGuard, RolesGuard)
@OnlyRole(Roles.USER)
@Controller('wishList')
export class WishListController {
  constructor(private readonly wishListService: WishListService) { }

  @Patch(':productId')
  Like(@Param("productId") productId: string, @GetPayload() payload: userTokenPayload) {
    return this.wishListService.LikeProduct(productId, payload);
  }
  @Delete(':productId')
  DisLike(@Param("productId") productId: string, @GetPayload() payload: userTokenPayload) {
    return this.wishListService.dislikeProduct(productId, payload);
  }

}
