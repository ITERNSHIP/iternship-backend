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
import { ConfirmationEntity } from '../entities/confirmation.entity';
import { RegisterEntity } from '../entities/regis.entity';
import { UserEntity } from '../entities/user.entity';
const bcrypt = require('bcrypt');

export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(RegisterEntity)
    private regisRepository: Repository<RegisterEntity>,

    @InjectRepository(ConfirmationEntity)
    private confirmationRepository: Repository<ConfirmationEntity>,
    private jwtService: JwtService
  ) {}

  async create(user: UserEntity) {
    try {
      if (user == null) {
        throw new NotAcceptableException();
      } else if (user.status == null) {
        user.status = false;
      }
      user.password = await bcrypt.hash(user.password, 10);
      await this.userRepository.save(user);
      return {
        status: "success",
        message: "Crate User Success",
      };
    } catch (err) {
      return err;
    }
  }
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

  async update(user: UserEntity) {
    try {
      if (!user.userId) {
        throw new ForbiddenException();
      }
      user.password = await bcrypt.hash(user.password, 10);
      await this.userRepository.update(user.userId, user);
      return {
        status: "success",
        message: "Update Success",
      };
    } catch (err) {
      return err;
    }
  }

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
        message: "Deltete User  Success",
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
      await this.regisRepository.save(regis);
      return {
        status: "success",
        message: "Crate RegisterForm Success",
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
        message: "Deltete RegisterForm  Success",
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
        message: "Crate ConfirmationForm Success",
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
  async login(req:any,response:any){


    const user = await this.userRepository.findOneBy({
      email:req.email
    })
    if (!user) {
      throw new BadRequestException('invalid credentials');
  }

  if (!await bcrypt.compare(req.password, user.password)) {
      throw new BadRequestException('invalid credentials');
  }

    const jwt = await this.jwtService.signAsync({id: user.userId},{secret:process.env.JWT_SECRET,expiresIn:'1d'});

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

}
