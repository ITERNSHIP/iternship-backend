import { BadRequestException, ForbiddenException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { CompanyEntity } from '../entities/company.entity';
import { CompanyViewRegis } from '../entities/companyViewRegis.entity';
import { InternshipNewsEntity } from '../entities/internshipNews.entity';
import { RecruitingEntity } from '../entities/recruiting.enity';
const bcrypt = require('bcrypt');

  
  export class CompanyService {
    constructor(
      @InjectRepository(CompanyEntity)
      private companyRepository: Repository<CompanyEntity>,
  
      @InjectRepository(CompanyViewRegis)
      private cvrRepository: Repository<CompanyViewRegis>,

      @InjectRepository(InternshipNewsEntity)
      private InternshipNewsRepository: Repository<InternshipNewsEntity>,

      @InjectRepository(RecruitingEntity)
      private RecruitingRepository: Repository<RecruitingEntity>,
      private jwtService: JwtService
  
    ) {}

    async createNews(news: InternshipNewsEntity) {
      try {
        if (news == null) {
          throw new NotFoundException();
        } 
        
        await this.InternshipNewsRepository.save(news);
        return {
          status: "success",
          message: "Crate InternshipNews Success",
        };
      } catch (err) {
        return err;
      }
    }

    async findAllNews(): Promise<InternshipNewsEntity[]> {
      return this.InternshipNewsRepository.find();
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
          message: "Deltete InternshipNews  Success",
        };
      } catch (err) {
        return err;
      }
    }
    async createCompanyStaff(cnstaff: CompanyEntity) {
      try {
        if (cnstaff == null) {
          throw new NotAcceptableException();
        } 
        cnstaff.password = await bcrypt.hash(cnstaff.password, 10);
        await this.companyRepository.save(cnstaff);
        return {
          status: "success",
          message: "Crate CompanyStaff Success",
        };
      } catch (err) {
        return err;
      }
    }
    
    async findAllCompanyStaff(): Promise<CompanyEntity[]> {
      return this.companyRepository.find();
    }

    async findOneCompanyStaff(companyId) {
      const result = await this.companyRepository.findOneBy({
        companyId:companyId
      })
      if (!result) {
        throw new NotFoundException();
      }
      return result
    }
    async createRecruiting(recruiting: RecruitingEntity) {
      try {
        if (recruiting == null) {
          throw new NotAcceptableException();
        } 
        
        await this.RecruitingRepository.save(recruiting);
        return {
          status: "success",
          message: "Crate Recruit Success",
        };
      } catch (err) {
        return err;
      }
    }
    async updateRecruiting(recruiting: any) {
      const result = await this.RecruitingRepository.findOneBy({
        recruitId:recruiting.recruitId
      })
        if (!result) {
          throw new ForbiddenException();
        }
        await this.RecruitingRepository.update(recruiting.recruitId, recruiting);
        return {
          status: "success",
          message: "Update Success",
        };
    }
    async deleteRecruiting(id:any) {
        const result = await this.RecruitingRepository.findOneBy({
          recruitId:id
        })
        if (!result) {
          throw new NotFoundException();
        }
        await this.RecruitingRepository.delete(id);
        return {
          status: "success",
          message: "Deltete Recruit  Success",
        };
      
    } async findAllRecruit(): Promise<RecruitingEntity[]> {
      return this.RecruitingRepository.find();
    }

    async findOneRecruit(recruitId) {
      const result = await this.RecruitingRepository.findOneBy({
        recruitId:recruitId
      })
      if (!result) {
        throw new NotFoundException();
      }
      return result
    }
    async login(req:any,response:any){
      const user = await this.companyRepository.findOneBy({
        email:req.email
      })
      console.log(user)
      if (!user) {
        throw new BadRequestException('invalid credentials');
    }
  
    if (!await bcrypt.compare(req.password, user.password)) {
        throw new BadRequestException('invalid credentials');
    }
  
      const jwt = await this.jwtService.signAsync({id: user.companyId},{secret:process.env.JWT_SECRET,expiresIn:'1d'});
  
    response.cookie('jwt', jwt, {httpOnly: true});
  
    return {
        message: 'success'
    };
    }
    async logout(response:any) {
      response.clearCookie('jwt');
  
      return {
          message: 'success'
      }
  }

    customQuery(image,id):any{
      if(image==null || id==null){
        throw new NotAcceptableException;
      }
      return this.companyRepository.createQueryBuilder().update(CompanyEntity).set({imageName: image}).
      where("companyId = :id", {id : id}).execute()
    }
  }
  