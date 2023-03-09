import { PickType } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";
import { CreateOrderDto } from "./create-order.dto";

export class SelfOrderDto extends PickType(CreateOrderDto, ['products'] as const) { 
}
