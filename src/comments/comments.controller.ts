import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { GetPayload, OnlyRole } from 'src/decorators';
import { JwtGuard, RolesGuard } from 'src/Auth/guards';
import { Roles, userTokenPayload } from 'src/interfaces';
@UseGuards(JwtGuard, RolesGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }


  @OnlyRole(Roles.USER)
  @Post(":productId")
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Param('productId') productId: string,
    @GetPayload() user: userTokenPayload
  ) {
    return this.commentsService.create(createCommentDto, user.sub, productId);
  }

  @OnlyRole(Roles.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
