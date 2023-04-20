import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class parseJsonPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const Output = JSON.parse(value.product_description)
    // console.log(typeof Output);
    
    return Output
  }
}