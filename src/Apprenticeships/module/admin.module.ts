import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from '../controller/admin.controller';
import { AdminEntity } from '../entities/admin.entity';
import { CompanyEntity } from '../entities/company.entity';
import { StaffEntity } from '../entities/staff.entity';
import { AdminService } from '../service/admin.service';




@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports:[TypeOrmModule.forFeature([CompanyEntity,StaffEntity,AdminEntity])],
  exports:[AdminService]
})
export class AdminModule {}