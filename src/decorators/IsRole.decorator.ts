import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { Roles } from '../interfaces';

// class validator for dto that chek if role is part of role enum 
export function IsRole(ValidationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsRole',
      target: object.constructor,
      propertyName: propertyName,
      options: ValidationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
         return value in Roles
        },
      },
    });
  };
}