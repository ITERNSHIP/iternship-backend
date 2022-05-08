import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { CompanyEntity } from '../entities/company.entity';
import { CompanyViewRegis } from '../entities/companyViewRegis.entity';
import { InternshipNewsEntity } from '../entities/internshipNews.entity';
const bcrypt = require('bcrypt');

  
  export class CompanyService {
    constructor(
      @InjectRepository(CompanyEntity)
      private companyRepository: Repository<CompanyEntity>,
  
      @InjectRepository(CompanyViewRegis)
      private cvrRepository: Repository<CompanyViewRegis>,

      @InjectRepository(InternshipNewsEntity)
      private InternshipNewsRepository: Repository<InternshipNewsEntity>,
  
    ) {}

    async createNews(news: InternshipNewsEntity) {
      try {
        if (news == null) {
          throw new NotAcceptableException();
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

    async findAll(): Promise<InternshipNewsEntity[]> {
      return this.InternshipNewsRepository.find();
    }

    async findOne(newsId) {
      if (
        this.InternshipNewsRepository.findByIds(newsId) == null ||
        (await this.InternshipNewsRepository.findByIds(newsId)).length <= 0
      ) {
        throw new NotFoundException();
      }
      return await this.InternshipNewsRepository.findByIds(newsId);
    }

    async delete(id) {
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
  }
  