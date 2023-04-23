import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class parseJsonPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if(!value.json_body) throw new BadRequestException("body is missing");
    console.log(value.json_body);
    
    const Output = JSON.parse(value.json_body)
    // console.log(typeof Output);
    
    return Output
  }
}