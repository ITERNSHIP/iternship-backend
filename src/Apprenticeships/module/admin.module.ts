import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from '../controller/admin.controller';
import { AdminEntity } from '../entities/admin.entity';
import { CompanyEntity } from '../entities/company.entity';
import { StaffEntity } from '../entities/staff.entity';
import { AdminMiddleware } from '../middlewares/admin.middleware';
import { AdminService } from '../service/admin.service';
import { JwtService } from '@nestjs/jwt';



@Module({
  controllers: [AdminController],
  providers: [AdminService,JwtService],
  imports:[TypeOrmModule.forFeature([CompanyEntity,StaffEntity,AdminEntity])],
  exports:[AdminService]
})
export class AdminModule{
//  implements NestModule {
//   public configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(AdminMiddleware)
//       .exclude({ path: 'admin/login', method: RequestMethod.POST },
//       { path: 'admin/logout', method: RequestMethod.POST }
//       )
//       .forRoutes(AdminController);
//   }
}