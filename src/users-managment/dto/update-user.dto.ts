import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';


// this dto herrit all the fields of create-user-dto but make them optional 
//using the partial type method  of swagger library @nestjs/swagger
export class UpdateUserDto extends PartialType(CreateUserDto) {}
