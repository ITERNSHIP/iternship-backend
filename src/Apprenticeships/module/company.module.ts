import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from '../controller/company.controller';
import { CompanyEntity } from '../entities/company.entity';
// import { CompanyViewRegis } from '../entities/companyViewRegis.entity';
import { InternshipNewsEntity } from '../entities/internshipNews.entity';
import { RecruitingEntity } from '../entities/recruiting.enity';
import { CompanyMiddleware } from '../middlewares/company.middleware';
import { CompanyService } from '../service/company.service';


@Module({
  controllers: [CompanyController],
  providers: [CompanyService,JwtService],
  imports:[TypeOrmModule.forFeature([CompanyEntity,InternshipNewsEntity,RecruitingEntity,
    // CompanyViewRegis
  ])],
  exports:[CompanyService]
})

export class CompanyModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CompanyMiddleware)
      .exclude({ path: 'company/login', method: RequestMethod.POST },
      { path: 'company/logout', method: RequestMethod.POST },
      { path: 'company/cnstaff', method: RequestMethod.POST }
      )
      .forRoutes(CompanyController);
  }

}