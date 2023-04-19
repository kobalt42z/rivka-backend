
import { PipeTransform, Injectable, ArgumentMetadata, ParseFilePipe, BadRequestException, FileValidator } from '@nestjs/common';
export interface ProductReqValidatorInput {
  image: Express.Multer.File[],
  product_description: Express.Multer.File[],
}


interface FileValidationOptions {
  allowedImageTypes: string[]
  maxImageSize: number
}



@Injectable()
export class ProductReqValidator implements PipeTransform {
  constructor(private validationOption: FileValidationOptions) { }
  transform({ image: [target] }: ProductReqValidatorInput, metadata: ArgumentMetadata) {

    if (!(target.size <= this.validationOption.maxImageSize 
      && this.validationOption.allowedImageTypes.includes(target.mimetype)))
      throw new BadRequestException('invalid image !');

      return target
  }
}