import { BadRequestException, NotAcceptableException, NotFoundException,ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { StaffEntity } from '../entities/staff.entity';
import { JwtService } from '@nestjs/jwt';
import { RegisterEntity } from '../entities/regis.entity';
import { ConfirmationEntity } from '../entities/confirmation.entity';
import { InternshipNewsEntity } from '../entities/internshipNews.entity';
import { RecruitingEntity } from '../entities/recruiting.entity';
import { CompanyEntity } from '../entities/company.entity';
const bcrypt = require('bcrypt');

  
  export class StaffService {
    constructor(
      @InjectRepository(StaffEntity)
      private   staffRepository:Repository<StaffEntity>,

      @InjectRepository(RegisterEntity)
      private regisRepository: Repository<RegisterEntity>,

      @InjectRepository(ConfirmationEntity)
      private ConfirmationRepository: Repository<ConfirmationEntity>,

      @InjectRepository(InternshipNewsEntity)
      private InternshipNewsRepository: Repository<InternshipNewsEntity>,

      @InjectRepository(RecruitingEntity)
      private RecruitingRepository: Repository<RecruitingEntity>,
      
      @InjectRepository(CompanyEntity)
      private companyRepository: Repository<CompanyEntity>,


      private jwtService: JwtService
    ) {}
    async findAll(): Promise<StaffEntity[]> {
        return this.staffRepository.find();
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
          async findOneRegis(regisId) {
            const result = await this.regisRepository.findOneBy({
              regisId:regisId
            })
            if (!result) {
              throw new NotFoundException();
            }
            // return this.regisRepository.createQueryBuilder("regis").leftJoinAndSelect('regis.user', 'user').where("regis.regisId = :id ",{id:regisId}).getMany()
            return result
          }
          async findAllRegis(): Promise<RegisterEntity[]> {
            return this.regisRepository.find();
          }
          async findOneconfirmmation(confirmationId) {
            const result = await this.ConfirmationRepository.findOneBy({
              confirmationId:confirmationId
            })
                if (!result) {
                  throw new NotFoundException();
                }
                return result
              }
          async findAllConfirmation(): Promise<ConfirmationEntity[]> {
            return this.ConfirmationRepository.find();
          }

          async createNews(news: InternshipNewsEntity) {
            try {
              if (news == null) {
                throw new NotFoundException();
              } 
              
              await this.InternshipNewsRepository.save(news);
              return {
                status: "success",
                message: "Create InternshipNews Success",
              };
            } catch (err) {
              return err;
            }
          }
      
          async findAllNews(): Promise<InternshipNewsEntity[]> {
            return this.InternshipNewsRepository.find();
          }
          async findAllNewsbyCompany(companyName:any) {
            let statement:string =`select * from internshipnews where "companyName" = '${companyName}'`
            const result = await  this.InternshipNewsRepository.query(statement)
            return result
          }
      
          async findOneNews(newsId) {
            const result = await this.InternshipNewsRepository.findOneBy({
              newsId:newsId
            })
            if (!result) {
              throw new NotFoundException();
            }
            return result
          }
      
          async updateInternshipNews(news: any) {
            const result = await this.InternshipNewsRepository.findOneBy({
              newsId:news.newsId
            })
              if (!result) {
                throw new ForbiddenException();
              }
              await this.InternshipNewsRepository.update(news.newsId, news);
              return {
                status: "success",
                message: "Update Success",
              };
          }
          
          async deleteNews(id) {
            try {
              if (
                this.InternshipNewsRepository.findByIds(id) == null ||
                (await this.InternshipNewsRepository.findByIds(id)).length <= 0
              ) {
                throw new NotFoundException();
              }
              await this.InternshipNewsRepository.delete(id);
              return {
                status: "success",
                message: "Delete InternshipNews  Success",
              };
            } catch (err) {
              return err;
            }
          }

      async findAllRecruit(): Promise<RecruitingEntity[]> {
         return this.RecruitingRepository.find();
          }
          
      async findInformbyCompanyName(companyName) {
        let statement:string =`SELECT c."companyName",c."companyId",c."imageName"
                                FROM recruiting r
                                INNER JOIN companys c
                                ON r."companyCompanyId"=c."companyId"
                                and  c."companyName" = '${companyName}'`
        const result = await  this.InternshipNewsRepository.query(statement)
        if (!result) {
         throw new NotFoundException();
           }
          return result
        }
        async findInformbyCompanyId(companyId) {
          let statement:string =`SELECT r."recruitId",r."title",r."endDate"
          FROM recruiting r
          INNER JOIN companys c
          ON r."companyCompanyId"=c."companyId"
          where DATE(r."endDate") > DATE(NOW())
          and c."companyId" = '${companyId}'`
          const result = await  this.InternshipNewsRepository.query(statement)
          if (!result) {
           throw new NotFoundException();
             }
            return result
          }
          async getAllCompany() {
            const result = await this.companyRepository.createQueryBuilder("companys").
            select(["companys.companyId","companys.companyName","companys.imageName"])
            .getMany()
            if (!result) {
              throw new NotFoundException();
            }
            return result
          }
      async login(req:any,response:any){
        const staff = await this.staffRepository.findOneBy({
          email:req.email
        })
        if (!staff) {
          throw new BadRequestException('invalid credentials');
      }
    
      if (!await bcrypt.compare(req.password, staff.password)) {
          throw new BadRequestException('invalid credentials');
      }
    
        const jwt = await this.jwtService.signAsync({id: staff.staffId},{secret:process.env.JWT_SECRET,expiresIn:'1d'});
    
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
  