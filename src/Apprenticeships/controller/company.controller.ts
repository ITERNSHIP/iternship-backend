import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { Body, Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { CompanyEntity } from '../entities/company.entity';
import { InternshipNewsEntity } from '../entities/internshipNews.entity';
import { CompanyService } from '../service/company.service';


@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService){}

  @Post('/add')
  create(@Body() news: InternshipNewsEntity): Promise<InternshipNewsEntity> {
    return this.companyService.createNews(news);
  }

  @Get('/getAllNews')
  async findAll(): Promise<InternshipNewsEntity[]> {
    return this.companyService.findAll();
  }

  @Get('/getNewsById/:id')
  async findOne(@Param('id') id) {
  return this.companyService.findOne(id);

}

//   @Put('/update/:id')
//   async update(@Param('id') id, @Body() user: UserEntity): Promise<any>{
//     user.userId = Number(id)
//     return this.userService.update(user);
//   }

  @Delete('/delete/:id')
  async delete(@Param('id') id): Promise<any> {
    return this.companyService.delete(id);
  }


}
