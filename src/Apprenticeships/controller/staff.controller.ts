import { Body, Controller, Delete, Get, Param, Post, Put,Response,Query } from '@nestjs/common';
import { CompanyEntity } from '../entities/company.entity';
import { ConfirmationEntity } from '../entities/confirmation.entity';
import { InternshipNewsEntity } from '../entities/internshipNews.entity';
import { RecruitingEntity } from '../entities/recruiting.entity';
import { RegisterEntity } from '../entities/regis.entity';
import { StaffEntity } from '../entities/staff.entity';
import { StaffService } from '../service/staff.service';



@Controller('staff')
export class StaffController {
  constructor(private staffService: StaffService){}

    @Get('/getallstaff')
    async findAll(): Promise<StaffEntity[]> {
      return this.staffService.findAll();
    }

    @Get('/get/:id')
    async findOne(@Param('id') id) {
    return await this.staffService.findOne(id);
  }
  @Get('/getAllRegister')
  async findAllRegis(): Promise<RegisterEntity[]> {
    return this.staffService.findAllRegis();
  }

  @Get('/getRegis/:id')
  async findOneRegis(@Param('id') id) {
  return this.staffService.findOneRegis(id);
}
  @Get('/findAllConfirmation')
  async findAllConfirmation(): Promise<ConfirmationEntity[]> {
    return this.staffService.findAllConfirmation();
  }
  @Get('/getRegis/:id')
  async findOneconfirmmation(@Param('id') id) {
  return this.staffService.findOneconfirmmation(id);
}
@Post('/addnews')
createnews(@Body() news: InternshipNewsEntity): Promise<InternshipNewsEntity> {
  return this.staffService.createNews(news);
}

@Get('/getAllNews')
async findAllNews(): Promise<InternshipNewsEntity[]> {
  return this.staffService.findAllNews();
}
@Get('/findAllNewsbyCompany')
async findAllNewsbyCompany(@Query('companyName') companyName: any) {
  return this.staffService.findAllNewsbyCompany(companyName);
}
@Get('/getNewsById/:id')
async findOneNews(@Param('id') id) {
return this.staffService.findOneNews(id);
}
@Put('/updateNews/:id')
async updateInternshipNews(@Param('id') id:any, @Body() news: InternshipNewsEntity): Promise<any>{
news.newsId = id
return this.staffService.updateInternshipNews(news);

}

@Delete('/deleteNews/:id')
  async delete(@Param('id') id): Promise<any> {
    return this.staffService.deleteNews(id);
  }
  @Get('/getAllRecruit')
  async findAllRecruit(): Promise<RecruitingEntity[]> {
    return this.staffService.findAllRecruit();
  }

  @Get('/getAllconfirmation')
  async findAllconfirmationForm(): Promise<ConfirmationEntity[]> {
   return this.staffService.findAllConfirmation();
  }  
  
  @Get('/getconfirmation/:id')
  async findOneconfirmationForm(@Param('id') id) {
  return this.staffService.findOneconfirmmation(id);
}
@Get('/findInformbyCompanyName')
async findregisPass(@Query('companyName') companyName: any) {
  return this.staffService.findInformbyCompanyName(companyName);
}
@Get('/findInformbyCompanyId')
async findInformbyCompanyId(@Query('companyId') companyId: any) {
  return this.staffService.findInformbyCompanyId(companyId);
}

@Get('/getAllCompany')
async getAllCompany(): Promise<CompanyEntity[]> {
  return this.staffService.getAllCompany();
}
  @Post('/login')
  async login(@Body() req:any,   @Response({passthrough: true}) response: Response) {
  return this.staffService.login(req,response);
  }  
  @Post('/logout')
  async logout(@Response({passthrough: true}) response: Response) {
  return this.staffService.logout(response);
  }
 
}
