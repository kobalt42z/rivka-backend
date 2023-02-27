import { createParamDecorator, ExecutionContext } from "@nestjs/common"

/*
* this decorator grab the payload data from requset @Req 
* and ctx that is the context execution where the decorator is executed
* the ctx wanted here is of type  express request 
*/
export const GetPayload = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request: Express.Request = ctx.switchToHttp().getRequest()
        return request.user
    }
);