import { ValidationPipeOptions } from "@nestjs/common";

export const VALIDATION_CONFIG:ValidationPipeOptions =
{
    whitelist: true,
    enableDebugMessages: true,
    forbidNonWhitelisted: true,
    validateCustomDecorators:true //thorow error when not whitelisted value 
}
