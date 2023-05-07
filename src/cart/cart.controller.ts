import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe, UsePipes } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { GetPayload } from 'src/decorators';
import { JwtGuard } from 'src/Auth/guards';
import { VALIDATION_CONFIG } from 'src/GlobalConst';

@UseGuards(JwtGuard)
@UsePipes(new ValidationPipe(VALIDATION_CONFIG))
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

 
  @Post()
  create(@Body() createCartDto: CreateCartDto ,@GetPayload() user) {
    return this.cartService.addToCart(createCartDto,user);
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
