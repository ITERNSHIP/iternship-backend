import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { AdminEntity } from '../entities/admin.entity';
import { CompanyEntity } from '../entities/company.entity';
import { StaffEntity } from '../entities/staff.entity';


  
  export class AdminService {
    constructor(
      @InjectRepository(AdminEntity)
      private adminRepository: Repository<AdminEntity>,

      @InjectRepository(StaffEntity)
      private staffRepository: Repository<StaffEntity>,

      @InjectRepository(CompanyEntity)
      private companyRepository: Repository<CompanyEntity>,
    ) {}


  }
  