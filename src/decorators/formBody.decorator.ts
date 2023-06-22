import { BadRequestException, Body, createParamDecorator, ExecutionContext, ValidationPipe } from '@nestjs/common';
import { VALIDATION_CONFIG } from 'src/GlobalConst';
import { parseJsonPipe } from 'src/products/pipes/ParseJson.pipe';


const getBody = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const body = request.body;
        return body
    },)

export const FormBody = () =>
    getBody(
        new parseJsonPipe,
        new ValidationPipe(VALIDATION_CONFIG)
    )