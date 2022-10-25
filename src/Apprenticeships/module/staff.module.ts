import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffEntity } from '../entities/staff.entity';
import { JwtService } from '@nestjs/jwt';
import { StaffController } from '../controller/staff.controller';
import { StaffService } from '../service/staff.service';
import { RegisterEntity } from '../entities/regis.entity';
import { StaffMiddleware } from '../middlewares/staff.middleware';
import { ConfirmationEntity } from '../entities/confirmation.entity';
import { InternshipNewsEntity } from '../entities/internshipNews.entity';
import { RecruitingEntity } from '../entities/recruiting.entity';
import { CompanyEntity } from '../entities/company.entity';



@Module({
  controllers: [StaffController],
  providers: [StaffService,JwtService],
  imports:[TypeOrmModule.forFeature([StaffEntity,RegisterEntity,ConfirmationEntity,InternshipNewsEntity,RecruitingEntity,CompanyEntity])],
  exports:[StaffService]
})
export class StaffModule   
implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(StaffMiddleware)
      .exclude({ path: 'staff/login', method: RequestMethod.POST },
      { path: 'staff/logout', method: RequestMethod.POST },
      { path: 'staff/add', method: RequestMethod.POST }
      )
      .forRoutes(StaffController);
  }

}