import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { CompanyEntity } from '../entities/company.entity';
import { ConfirmationEntity } from '../entities/confirmation.entity';
import { InternshipNewsEntity } from '../entities/internshipNews.entity';
import { RecruitingEntity } from '../entities/recruiting.entity';
import { RegisterEntity } from '../entities/regis.entity';
import { UserEntity } from '../entities/user.entity';
const bcrypt = require('bcrypt');
import axios from 'axios';

export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(RegisterEntity)
    private regisRepository: Repository<RegisterEntity>,

    @InjectRepository(ConfirmationEntity)
    private confirmationRepository: Repository<ConfirmationEntity>,

    @InjectRepository(RecruitingEntity)
    private RecruitingRepository: Repository<RecruitingEntity>,

    @InjectRepository(InternshipNewsEntity)
    private InternshipNewsRepository: Repository<InternshipNewsEntity>,

    @InjectRepository(CompanyEntity)
    private companyRepository: Repository<CompanyEntity>,

    private jwtService: JwtService
  ) {}

  // async create(user: UserEntity) {
  //   try {
  //     if (user == null) {
  //       throw new NotAcceptableException();
  //     } else if (user.status == null) {
  //       user.status = false;
  //     }
  //     user.password = await bcrypt.hash(user.password, 10);
  //     await this.userRepository.save(user);
  //     return {
  //       status: "success",
  //       message: "Create User Success",
  //     };
  //   } catch (err) {
  //     return err;
  //   }
  // }
  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findOne(userId) {
const result = await this.userRepository.findOneBy({
  userId:userId
})

    if (!result) {
      throw new NotFoundException();
    }
    return result
  }

  // async update(user: UserEntity) {
  //   try {
  //     if (!user.userId) {
  //       throw new ForbiddenException();
  //     }
  //     user.password = await bcrypt.hash(user.password, 10);
  //     await this.userRepository.update(user.userId, user);
  //     return {
  //       status: "success",
  //       message: "Update Success",
  //     };
  //   } catch (err) {
  //     return err;
  //   }
  // }

  async delete(id) {
    try {
      const result = await this.userRepository.findOneBy({
        userId:id
      })
      
      if (!result) {
        throw new NotFoundException();
      }
      await this.userRepository.delete(id);
      return {
        status: "success",
        message: "Delete User  Success",
      };
    } catch (err) {
      return err;
    }
  }
  async createRegisterForm(regis: RegisterEntity) {
    try {
      if (regis == null) {
        throw new NotAcceptableException();
      } 
     regis.status = "pending"
      await this.regisRepository.save(regis);
      return {
        status: "success",
        message: "Create RegisterForm Success",
      };
    } catch (err) {
      return err;
    }
  }
  async deleteRegisterForm(id) {
      if (
        this.regisRepository.findByIds(id) == null ||
        (await this.regisRepository.findByIds(id)).length <= 0
      ) {
        throw new NotFoundException();
      }
{
      await this.regisRepository.delete(id);
       return {
        status: "success",
        message: "Delete RegisterForm  Success",
      };
      }
    
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

  async createconfirmationForm(confirmation: ConfirmationEntity) {
    try {
      if (confirmation == null) {
        throw new NotAcceptableException();
      } 
    await this.confirmationRepository.save(confirmation)
      return {
        status: "success",
        message: "Create ConfirmationForm Success",
      };
    } catch (err) {
      return err;
    }
  }
  async findAllconfirmationForm(): Promise<ConfirmationEntity[]> {
    return this.confirmationRepository.find();
  }
  async findOneconfirmationForm(confirmationId) {
    const result = await this.confirmationRepository.findOneBy({
      confirmationId:confirmationId
    })
    if (!result) {
      throw new NotFoundException();
    }
    // return this.regisRepository.createQueryBuilder("regis").leftJoinAndSelect('regis.user', 'user').where("regis.regisId = :id ",{id:regisId}).getMany()
    return await this.confirmationRepository.find(confirmationId);
  }
  async findAllRecruit(): Promise<RecruitingEntity[]> {
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
  
  async getAllCompany() {
    const result = await this.companyRepository.createQueryBuilder("companys").
    select(["companys.companyId","companys.companyName","companys.companyDetail","companys.imageName"])
    .getMany()
    if (!result) {
      throw new NotFoundException();
    }
    return result
  }
  async findCompanyDetailById(companyId) {
    console.log(companyId)
    const result = await this.companyRepository.createQueryBuilder("companys").select(["companys.companyName","companys.companyDetail"])
    .where("companys.companyId = :companyId", { companyId: companyId }).getMany()
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
  async findregisBystatusPending() {
    const status = "pending"
    const result = await this.regisRepository.createQueryBuilder("regis").select()
    .where("regis.status = :status", { status: status }).getMany()
    if (!result) {
      throw new NotFoundException();
    }
    return result
  }
  async findregisBystatusPass() {
    const status = "pass"
    const result = await this.regisRepository.createQueryBuilder("regis").select()
    .where("regis.status = :status", { status: status }).getMany()
    if (!result) {
      throw new NotFoundException();
    }
    return result
  }
  async findregisBystatusNotpass() {
    const status = "notpass"
    const result = await this.regisRepository.createQueryBuilder("regis").select()
    .where("regis.status = :status", { status: status }).getMany()
    if (!result) {
      throw new NotFoundException();
    }
    return result
  }
  async authCode(code){
    const clientSecret = process.env.CLIENT_SECRET
    const clientId = process.env.CLIENT_ID
    const redirectUri = process.env.REDIRECT_URI

    const response = await axios({
      method: 'GET',
      url: `https://gatewayservice.sit.kmutt.ac.th/api/oauth/token?client_secret=${clientSecret}&client_id=${clientId}&code=${code}&redirect_uri=${redirectUri}`,
    }).catch(() => {
      throw new ForbiddenException('Token is Expried');
    });
    const user = await this.userRepository.findOneBy({
      userId:response.data.user_id
    })
    if(!user){
      await this.userRepository
    .createQueryBuilder()
    .insert()
    .into(UserEntity)
    .values([
        {userId : response.data.user_id, fullName: response.data.name_th,email:response.data.email }

    ])
    .execute()
    }else{
      await this.userRepository
    .createQueryBuilder()
    .update(UserEntity)
    .set({ userId : response.data.user_id, fullName: response.data.name_th,email:response.data.email })
    .where("userId = :userId", { userId: response.data.user_id })
    .execute()
    }
        const jwt = await this.jwtService.signAsync({id: user.userId},{secret:process.env.JWT_SECRET,expiresIn:'1d'});
    return {
      accessToken:jwt,
      logoutToken:response.data.token.token
  };
  }

  // async login(req:any,response:any){
  //   const user = await this.userRepository.findOneBy({
  //     email:req.email
  //   })
  //   if (!user) {
  //     throw new BadRequestException('invalid credentials');
  // }

  // if (!await bcrypt.compare(req.password, user.password)) {
  //     throw new BadRequestException('invalid credentials');
  // }

  //   const jwt = await this.jwtService.signAsync({id: user.userId},{secret:process.env.JWT_SECRET,expiresIn:'1d'});

  // // response.cookie('jwt', jwt);
  

  // return {
  //     message: 'success',
  //     accessToken:jwt
  // };
  // }
  async logout(response:any) {
    response.clearCookie('jwt');

    return {
        message: 'success'
    }
}

}
