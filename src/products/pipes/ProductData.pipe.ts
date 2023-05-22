
import { PipeTransform, Injectable, ArgumentMetadata, ParseFilePipe, BadRequestException, FileValidator } from '@nestjs/common';
export interface ProductReqValidatorInput {
  image: Express.Multer.File[],
  product_description: Express.Multer.File[],
  
}


interface FileValidationOptions {
  allowedImageTypes: string[]
  maxImageSize: number
  imageOptional?: boolean
}



@Injectable()
export class ImgAndJsonValidator implements PipeTransform {
  constructor(private validationOption: FileValidationOptions) { }
  transform(value: ProductReqValidatorInput, metadata: ArgumentMetadata) {
    if(this.validationOption.imageOptional) return undefined;
    if(!value)throw new BadRequestException('invalid req');
    if(!value.image)throw new BadRequestException('image field is missing');
    const { image:[target]} = value
    
    if (!(target.size <= this.validationOption.maxImageSize 
      && this.validationOption.allowedImageTypes.includes(target.mimetype)))
      throw new BadRequestException('invalid image !');

      return target
  }
}