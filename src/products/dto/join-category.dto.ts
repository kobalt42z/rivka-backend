import { PickType } from "@nestjs/swagger";
import { CreateProductDto } from "./create-product.dto";

export class JoinCategoryDto extends PickType(CreateProductDto,['categoryIds'] as const ) {} 