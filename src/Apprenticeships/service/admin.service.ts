import { NotFoundException } from '@nestjs/common';
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

    async findOne(id) {
        const obj =   await this.companyRepository.findOne(
            { where:
                { companyId: id }
            })
        console.log(obj)
        if(obj.status === false){
            console.log("test1")
            obj.status = true
            this.companyRepository.save(obj)
        }
else{
    console.log("test2")
    obj.status = false
    this.companyRepository.save(obj)
}        
      }

  }
  