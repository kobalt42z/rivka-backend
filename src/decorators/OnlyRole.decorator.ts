import { SetMetadata } from '@nestjs/common';
import { Roles } from '../interfaces';

/*
    * use this decorator to add the role in route metadata
    * this decorator can only get one role oftype Roles enum
    
    
 */
export const  OnlyRole =  (role: Roles) => SetMetadata('role', role);
