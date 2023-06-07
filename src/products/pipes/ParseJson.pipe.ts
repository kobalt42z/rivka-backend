import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class parseJsonPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if(!value.json_body) throw new BadRequestException("json_body is missing");

    const Output = JSON.parse(value.json_body)

    return Output
  }
}