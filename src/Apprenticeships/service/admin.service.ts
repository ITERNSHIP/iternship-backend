import { BadRequestException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { AdminEntity } from '../entities/admin.entity';
import { CompanyEntity } from '../entities/company.entity';
import { StaffEntity } from '../entities/staff.entity';
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcrypt');

  
  export class AdminService {
    constructor(
      @InjectRepository(AdminEntity)
      private   adminRepository:Repository<AdminEntity>,

      @InjectRepository(StaffEntity)
      private staffRepository: Repository<StaffEntity>,

      @InjectRepository(CompanyEntity)
      private companyRepository: Repository<CompanyEntity>,

      private jwtService: JwtService
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
              message: "Create Admin Success",
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
      async login(req:any,response:any){


        const admin = await this.adminRepository.findOneBy({
          email:req.email
        })
        if (!admin) {
          throw new BadRequestException('invalid credentials');
      }
    
      if (!await bcrypt.compare(req.password, admin.password)) {
          throw new BadRequestException('invalid credentials');
      }
    
        const jwt = await this.jwtService.signAsync({id: admin.adminId},{secret:process.env.JWT_SECRET,expiresIn:'1d'});
    
      // response.cookie('jwt', jwt);
    
      return {
          message: 'success',
          accessToken:jwt
      };
      }
      async logout(response:any) {
        response.clearCookie('jwt');
    
        return {
            message: 'success'
        }
    }
  }
  