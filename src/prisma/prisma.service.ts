import { Injectable , INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// make prisma client service injectable globaly 
@Injectable()
export class PrismaService extends PrismaClient  {
    
    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
          await app.close();
        });
      }

}
