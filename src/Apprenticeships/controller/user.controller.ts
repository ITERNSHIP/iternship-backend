import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { Body, Param,Query,Response } from '@nestjs/common/decorators/http/route-params.decorator';
import { CompanyEntity } from '../entities/company.entity';
import { ConfirmationEntity } from '../entities/confirmation.entity';
import { InternshipNewsEntity } from '../entities/internshipNews.entity';
import { RecruitingEntity } from '../entities/recruiting.entity';
import { RegisterEntity } from '../entities/regis.entity';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../service/user.service';


@Controller('users')
export class UserController {
  constructor(private userService: UserService){}

  // @Post('/add')
  // create(@Body() user: UserEntity): Promise<UserEntity> {
  //   return this.userService.create(user);
  // }

  @Get('/get')
  async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Get('/get/:id')
  async findOne(@Param('id') id) {
  return await this.userService.findOne(id);

}

  // @Put('/update/:id')
  // async update(@Param('id') id:string, @Body() user: UserEntity): Promise<any>{
  //   return this.userService.update(user);
  // }

  @Delete('/delete/:id')
  async delete(@Param('id') id): Promise<any> {
    return this.userService.delete(id);
  }

  @Post('/createRegis')
  createRegis(@Body() regis: RegisterEntity): Promise<RegisterEntity> {
    return this.userService.createRegisterForm(regis);
  }

  @Delete('/deleteRegisterForm/:id')
  async deleteRegisterForm(@Param('id') id): Promise<any> {
    return this.userService.deleteRegisterForm(id);
  }  
  @Get('/getAllRegister')
  async findAllRegis(): Promise<RegisterEntity[]> {
    return this.userService.findAllRegis();
  }

  @Get('/getRegis/:id')
  async findOneRegis(@Param('id') id) {
  return this.userService.findOneRegis(id);
}
  @Post('/createconfirmationForm')
  async createconfirmationForm(@Body() confirmation: ConfirmationEntity) {
  return this.userService.createconfirmationForm(confirmation);
 } 
 
  @Get('/getAllconfirmation')
  async findAllconfirmationForm(): Promise<ConfirmationEntity[]> {
   return this.userService.findAllconfirmationForm();
  }  
  
  @Get('/getconfirmation/:id')
  async findOneconfirmationForm(@Param('id') id) {
  return this.userService.findOneconfirmationForm(id);
}
@Get('/getAllRecruit')
async findAllRecruit(): Promise<RecruitingEntity[]> {
  return this.userService.findAllRecruit();
}

@Get('/getRecruitById/:id')
async findOneRecruit(@Param('id') id) {
return this.userService.findOneRecruit(id);
}

@Get('/getAllNews')
async findAllNews(): Promise<InternshipNewsEntity[]> {
  return this.userService.findAllNews();
}

@Get('/getNewsById/:id')
async findOneNews(@Param('id') id) {
return this.userService.findOneNews(id);

}

@Get('/getAllCompany')
async getAllCompany(): Promise<CompanyEntity[]> {
  return this.userService.getAllCompany();
}
@Get('/findCompanyDetailById')
  async findCompanyDetailByName(@Query('companyId') companyId: any) {
    return this.userService.findCompanyDetailById(companyId);
  }
@Get('/findRecruitById')
async findRecruitByCompanyId(@Query('companyId') companyId: any) {
  return this.userService.findRecruitByCompanyId(companyId);
  }
// @Post('/login')
// async login(@Body() req:any,   @Response({passthrough: true}) response: Response) {
// return this.userService.login(req,response);
// }  
@Post('/logout')
async logout(@Response({passthrough: true}) response: Response) {
return this.userService.logout(response);
}

@Get('/authcode')
async authcode(@Query('code') code: any) {
  return this.userService.authCode(code);
  }
}
