import { BadRequestException, ForbiddenException, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { CompanyEntity } from '../entities/company.entity';
// import { CompanyViewRegis } from '../entities/companyViewRegis.entity';
import { InternshipNewsEntity } from '../entities/internshipNews.entity';
import { RecruitingEntity } from '../entities/recruiting.entity';
import { RegisterEntity } from '../entities/regis.entity';
const bcrypt = require('bcrypt');

  
  export class CompanyService {
    constructor(
      @InjectRepository(CompanyEntity)
      private companyRepository: Repository<CompanyEntity>,
  
      // @InjectRepository(CompanyViewRegis)
      // private cvrRepository: Repository<CompanyViewRegis>,

      @InjectRepository(InternshipNewsEntity)
      private InternshipNewsRepository: Repository<InternshipNewsEntity>,

      @InjectRepository(RecruitingEntity)
      private RecruitingRepository: Repository<RecruitingEntity>,

      @InjectRepository(RegisterEntity)
      private RegisterRepository: Repository<RegisterEntity>,

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
    async createCompanyStaff(cnstaff: CompanyEntity) {
      try {
        if (cnstaff == null) {
          throw new NotAcceptableException();
        } 
        cnstaff.password = await bcrypt.hash(cnstaff.password, 10);
        await this.companyRepository.save(cnstaff);
        return {
          status: "success",
          message: "Create CompanyStaff Success",
        };
      } catch (err) {
        return err;
      }
    }
    async updateCompanyStaff(company: any) {
      try {
        if (!company.companyId) {
          throw new ForbiddenException();
        }
        company.password = await bcrypt.hash(company.password, 10);
        await this.companyRepository.update(company.companyId, company);
        return {
          status: "success",
          message: "Update Success",
        };
      } catch (err) {
        return err;
      }
    }
    async updateCompanyDetailById(id:any,request: any) {
        if (
          this.companyRepository.findByIds(id) == null ||
          (await this.companyRepository.findByIds(id)).length <= 0
        ) {
          throw new NotFoundException();
        }
        await this.companyRepository.createQueryBuilder().update(CompanyEntity).set({companyDetail: request.companyDetail})
        .where("companyId = :id", {id : id}).execute()
        return {
          status: "success",
          message: "Update Success"
        };
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
    async findCompanyDetailByName(companyName) {
      const result = await this.companyRepository.createQueryBuilder("companys").select("companys.companyDetail")
      .where("companys.companyName = :companyName", { companyName: companyName }).getMany()
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
          message: "Create Recruit Success",
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
          message: "Delete Recruit  Success",
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
    async findRecruitByCompanyId(companyId) {
      const result = await this.RecruitingRepository.createQueryBuilder("recruiting").select()
      .where("recruiting.companyCompanyId = :companyCompanyId", { companyCompanyId: companyId }).getMany()
      if (!result) {
        throw new NotFoundException();
      }
      return result
    }
    async findregisByCompanyName(companyName) {
      const result = await this.RegisterRepository.createQueryBuilder("regis").select()
      .where("regis.companyName = :companyName AND regis.status = 'pending'"
      , { companyName: companyName }).getMany()
      if (!result) {
        throw new NotFoundException();
      }
      return result
    }
    async findregisPass(companyName) {
      const result = await this.RegisterRepository.createQueryBuilder("regis").select()
      .where("regis.companyName = :companyName AND regis.status = 'pass'"
      , { companyName: companyName }).getMany()
      if (!result) {
        throw new NotFoundException();
      }
      return result
    }
    async updateRegisStatus(id:any,request: any) {
      if (
        this.RegisterRepository.findByIds(id) == null ||
        (await this.RegisterRepository.findByIds(id)).length <= 0
      ) {
        throw new NotFoundException();
      }
      await this.RegisterRepository.createQueryBuilder().update(RegisterEntity).set({status: request.status})
      .where("regisId = :id", {id : id}).execute()
      return {
        status: "success",
        message: "Update Success"
      };
  }

  async findregisBystatusPending() {
    const status = "pending"
    const result = await this.RegisterRepository.createQueryBuilder("regis").select()
    .where("regis.status = :status", { status: status }).getMany()
    if (!result) {
      throw new NotFoundException();
    }
    return result
  }
  async findregisBystatusPass() {
    const status = "pass"
    const result = await this.RegisterRepository.createQueryBuilder("regis").select()
    .where("regis.status = :status", { status: status }).getMany()
    if (!result) {
      throw new NotFoundException();
    }
    return result
  }
  async findregisBystatusNotpass() {
    const status = "notpass"
    const result = await this.RegisterRepository.createQueryBuilder("regis").select()
    .where("regis.status = :status", { status: status }).getMany()
    if (!result) {
      throw new NotFoundException();
    }
    return result
  }
    async login(req:any,response:any){
      const user = await this.companyRepository.findOneBy({
        email:req.email
      })
      if (!user) {
        throw new BadRequestException('invalid credentials');
    }
        if(user.status==true){
          throw new UnauthorizedException('Your account has been suspended.');
        }
    if (!await bcrypt.compare(req.password, user.password)) {
        throw new BadRequestException('invalid credentials');
    }
  
      const jwt = await this.jwtService.signAsync({id: user.companyId},{secret:process.env.JWT_SECRET,expiresIn:'1d'});
  
    // response.cookie('jwt', jwt);
  
    return {
        message: 'success',
        accessToken:jwt,
        companyId:user.companyId,
        companyName:user.companyName
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
      return this.companyRepository.createQueryBuilder().update(CompanyEntity).set({imageName: `${process.env.BASEURL}/company/getpic/${image}`}).
      where("companyId = :id", {id : id}).execute()
    }
  }
  