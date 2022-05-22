import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { AdminEntity } from '../entities/admin.entity';
import { CompanyEntity } from '../entities/company.entity';
import { StaffEntity } from '../entities/staff.entity';
const bcrypt = require('bcrypt');

  
  export class AdminService {
    constructor(
      @InjectRepository(AdminEntity)
      private   adminRepository:Repository<AdminEntity>,

      @InjectRepository(StaffEntity)
      private staffRepository: Repository<StaffEntity>,

      @InjectRepository(CompanyEntity)
      private companyRepository: Repository<CompanyEntity>,
    ) {}
    async findAll(): Promise<AdminEntity[]> {
        return this.adminRepository.find();
      }

    async create(admin: AdminEntity) {
        try {
          if (admin == null) {
            throw new NotAcceptableException();
          } else  {
            admin.password = await bcrypt.hash(admin.password, 10);
            await this.adminRepository.save(admin);
            return {
              status: "success",
              message: "Crate Admin Success",
            };
          }
        
        } catch (err) {
          return err;
        }
      }
    async findOne(adminId) {
        const result = await this.adminRepository.findOneBy({
          adminId:adminId
        })
        
            if (!result) {
              throw new NotFoundException();
            }
            return result
          }

    async limitAccount(id) {
        const obj =   await this.companyRepository.findOne(
            { where:
                { companyId: id }
            })
        if(obj.status === false){
            obj.status = true
            this.companyRepository.save(obj)
        }
else{
    obj.status = false
    this.companyRepository.save(obj)
}        
      }

  }
  