import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from '../controller/company.controller';
import { CompanyEntity } from '../entities/company.entity';
import { CompanyViewRegis } from '../entities/companyViewRegis.entity';
import { InternshipNewsEntity } from '../entities/internshipNews.entity';
import { CompanyService } from '../service/company.service';



@Module({
  controllers: [CompanyController],
  providers: [CompanyService],
  imports:[TypeOrmModule.forFeature([CompanyEntity,CompanyViewRegis,InternshipNewsEntity])],
  exports:[CompanyService]
})
export class CompanyModule {

}