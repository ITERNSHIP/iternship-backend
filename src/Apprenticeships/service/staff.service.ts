import { BadRequestException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { StaffEntity } from '../entities/staff.entity';
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcrypt');

  
  export class StaffService {
    constructor(
      @InjectRepository(StaffEntity)
      private   staffRepository:Repository<StaffEntity>,

      private jwtService: JwtService
    ) {}
    async findAll(): Promise<StaffEntity[]> {
        return this.staffRepository.find();
      }

    async create(staff: StaffEntity) {
        try {
          if (staff == null) {
            throw new NotAcceptableException();
          } else  {
            staff.password = await bcrypt.hash(staff.password, 10);
            await this.staffRepository.save(staff);
            return {
              status: "success",
              message: "Crate Staff Success",
            };
          }
        
        } catch (err) {
          return err;
        }
      }
    async findOne(staffId) {
        const result = await this.staffRepository.findOneBy({
          staffId:staffId
        })
        
            if (!result) {
              throw new NotFoundException();
            }
            return result
          }

//     async limitAccount(id) {
//         const obj =   await this.companyRepository.findOne(
//             { where:
//                 { companyId: id }
//             })
//         if(obj.status === false){
//             obj.status = true
//             this.companyRepository.save(obj)
//         }
// else{
//     obj.status = false
//     this.companyRepository.save(obj)
// }        
//       }
//       async login(req:any,response:any){


//         const admin = await this.adminRepository.findOneBy(req.emai)
//         if (!admin) {
//           throw new BadRequestException('invalid credentials');
//       }
    
//       if (!await bcrypt.compare(req.password, admin.password)) {
//           throw new BadRequestException('invalid credentials');
//       }
    
//         const jwt = await this.jwtService.signAsync({id: admin.adminId},{secret:process.env.JWT_SECRET,expiresIn:'1d'});
    
//       response.cookie('jwt', jwt, {httpOnly: true});
    
//       return {
//           message: 'success'
//       };
//       }
//       async logout(response:any) {
//         response.clearCookie('jwt');
    
//         return {
//             message: 'success'
//         }
//     }
  }
  