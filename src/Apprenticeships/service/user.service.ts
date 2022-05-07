import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
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
    private confirmationRepository: Repository<ConfirmationEntity>
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
    if (
      this.userRepository.findByIds(userId) == null ||
      (await this.userRepository.findByIds(userId)).length <= 0
    ) {
      throw new NotFoundException();
    }
    return await this.userRepository.findByIds(userId);
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
      if (
        this.userRepository.findByIds(id) == null ||
        (await this.userRepository.findByIds(id)).length <= 0
      ) {
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
    if (
      this.regisRepository.findByIds(regisId) == null ||
      (await this.regisRepository.findByIds(regisId)).length <= 0
    ) {
      throw new NotFoundException();
    }
    // return this.regisRepository.createQueryBuilder("regis").leftJoinAndSelect('regis.user', 'user').where("regis.regisId = :id ",{id:regisId}).getMany()
    return await this.regisRepository.find(regisId);
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
    if (
      this.confirmationRepository.findByIds(confirmationId) == null ||
      (await this.confirmationRepository.findByIds(confirmationId)).length <= 0
    ) {
      throw new NotFoundException();
    }
    // return this.regisRepository.createQueryBuilder("regis").leftJoinAndSelect('regis.user', 'user').where("regis.regisId = :id ",{id:regisId}).getMany()
    return await this.confirmationRepository.find(confirmationId);
  }
}
