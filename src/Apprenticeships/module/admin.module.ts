import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from '../controller/admin.controller';
import { CompanyController } from '../controller/company.controller';
import { CompanyEntity } from '../entities/company.entity';
import { StaffEntity } from '../entities/staff.entity';
import { AdminService } from '../service/admin.service';
import { CompanyService } from '../service/company.service';



@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports:[TypeOrmModule.forFeature([CompanyEntity,StaffEntity,])],
  exports:[AdminService]
})
export class AdminModule {}